import { defineNovaPlugin } from "@gtc-nova/kit/runtime";
import { useRuntimeConfig } from "nitro/runtime";
import type { PantheonFeatures } from "../../features";
import { Client, Room } from "colyseus.js";
import { getVirtualActions, getVirtualWorlds } from "../exports";
import type { NitroApp } from "nitro/types";
import type { ActionDefinition } from "../../types";
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
      worlds: new Map<string, Room>(),
      actions: new Map<string, ActionDefinition>(),
    };

    return { client };
  },
  runtimeSetup: {
    worlds: {
      getVirtualHandlers: getVirtualWorlds,
      initFeatureHandlers: async (nitro: NitroApp, handlers) => {
        for (const room of handlers) {
          try {
            const roomDef: any = (await room.handler()).default;
            nitro.pantheon.worlds.set(room.route || "default", roomDef);
            consola.info(`Initialized room: ${room.route}`);
          } catch (error) {
            consola.error(`Failed to initialize room: ${room.route}`, error);
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
  after: (nitro: NitroApp) => {
    consola.success("Pantheon plugin initialized.");
    consola.info(
      `Initialized actions: ${[...nitro.pantheon.actions.keys()].join(", ")}`
    );
  },
});
