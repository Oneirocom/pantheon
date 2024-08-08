import type { Client, Room } from "colyseus.js";

export interface ActionDefinition {
  type: string;
  handler: (client: any, data: any) => void | Promise<void>;
}

declare module "nitro/types" {
  interface NitroApp {
    pantheon: {
      client: Client;
      worlds: Map<string, Room>;
      actions: Map<string, ActionDefinition>;
    };
  }
}
