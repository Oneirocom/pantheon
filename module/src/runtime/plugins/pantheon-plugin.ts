import { defineNovaPlugin } from "@gtc-nova/kit/runtime";
import { useRuntimeConfig } from "nitro/runtime";
import type { PantheonFeatures } from "../../features";
import { Client, Room } from "colyseus.js";
import { getVirtualActions, getVirtualWorlds } from "../exports";
import type { NitroApp } from "nitro/types";
import type { ActionDefinition, RoomDefinition } from "../../types";
import consola from "consola";

interface PantheonOptions {
  serverUrl?: string;
  [key: string]: any;
}

export default defineNovaPlugin<PantheonFeatures, any>({
  useRuntimeConfig,
  initialize: async (nitro: NitroApp, config: any) => {
    const pantheonOptions: PantheonOptions = config.pantheon || {};
    const client = new Client(
      pantheonOptions.serverUrl || "ws://localhost:2567"
    );

    nitro.pantheon = {
      client,
      worlds: new Map<string, RoomDefinition>(),
      actions: new Map<string, ActionDefinition>(),
      activeRooms: new Map<string, Room>(),
      async connectToWorld(worldName: string, options?: any): Promise<Room> {
        if (this.activeRooms.has(worldName)) {
          return this.activeRooms.get(worldName)!;
        }
        const worldDef = this.worlds.get(worldName);
        if (!worldDef) {
          throw new Error(`World "${worldName}" not found`);
        }
        const room = await this.client.joinOrCreate(worldName, options);
        this.activeRooms.set(worldName, room);
        return room;
      },
      async disconnectFromWorld(worldName: string): Promise<void> {
        const room = this.activeRooms.get(worldName);
        if (room) {
          await room.leave();
          this.activeRooms.delete(worldName);
        }
      },
      async callAction(
        actionName: string,
        worldName: string,
        data: any
      ): Promise<void> {
        const action = this.actions.get(actionName);
        if (!action) {
          throw new Error(`Action "${actionName}" not found`);
        }
        const room = await this.connectToWorld(worldName);
        await action.handler(room, data);
      },
    };

    return { client };
  },
  runtimeSetup: {
    worlds: {
      getVirtualHandlers: getVirtualWorlds,
      initFeatureHandlers: async (nitro: NitroApp, handlers) => {
        for (const world of handlers) {
          try {
            const worldDef: RoomDefinition = (await world.handler()).default;
            nitro.pantheon.worlds.set(world.route || "default", worldDef);
            consola.info(`Initialized world: ${world.route}`);
          } catch (error) {
            consola.error(`Failed to initialize world: ${world.route}`, error);
          }
        }
      },
    },
    actions: {
      getVirtualHandlers: getVirtualActions,
      initFeatureHandlers: async (nitro: NitroApp, handlers) => {
        for (const action of handlers) {
          try {
            const actionDef: ActionDefinition = (await action.handler())
              .default;
            nitro.pantheon.actions.set(action.route || "default", actionDef);
            consola.info(`Initialized action: ${action.route}`);
          } catch (error) {
            consola.error(
              `Failed to initialize action: ${action.route}`,
              error
            );
          }
        }
      },
    },
  },
  before: (nitro: NitroApp) => {
    consola.info("Initializing Pantheon plugin...");
  },
  after: async (nitro: NitroApp) => {
    consola.success("Pantheon plugin initialized.");
    consola.info(
      `Initialized worlds: ${[...nitro.pantheon.worlds.keys()].join(", ")}`
    );
    consola.info(
      `Initialized actions: ${[...nitro.pantheon.actions.keys()].join(", ")}`
    );

    // Auto-join worlds marked as autoJoin
    for (const [worldName, worldDef] of nitro.pantheon.worlds) {
      if (worldDef.autoJoin) {
        try {
          await nitro.pantheon.connectToWorld(worldName);
          consola.success(`Auto-joined world: ${worldName}`);
        } catch (error) {
          consola.error(`Failed to auto-join world: ${worldName}`, error);
        }
      }
    }
  },
});
