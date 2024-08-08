import type { Client, Room } from "colyseus.js";

export interface RoomDefinition<T = any> {
  name: string;
  autoJoin?: boolean;
  onStateChange?: (state: T) => void;
  onMessage?: (type: string, message: any) => void;
  onError?: (code: number, message?: string) => void;
  onLeave?: (code: number) => void;
}

export interface ActionDefinition {
  type: string;
  handler: (room: Room, data: any) => void | Promise<void>;
}

declare module "nitro/types" {
  interface NitroApp {
    pantheon: {
      client: Client;
      worlds: Map<string, RoomDefinition>;
      actions: Map<string, ActionDefinition>;
      activeRooms: Map<string, Room>;
      connectToWorld(worldName: string, options?: any): Promise<Room>;
      disconnectFromWorld(worldName: string): Promise<void>;
      callAction(
        actionName: string,
        worldName: string,
        data: any
      ): Promise<void>;
    };
  }
}
