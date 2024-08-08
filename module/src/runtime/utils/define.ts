import { Room, Client } from "colyseus.js";

export interface RoomDefinition<T = any> {
  name: string;
  onStateChange?: (state: T) => void;
  onMessage?: (type: string, message: any) => void;
  onError?: (code: number, message?: string) => void;
  onLeave?: (code: number) => void;
}

export function defineRoom<T = any>(config: RoomDefinition<T>) {
  return {
    connect: async (client: Client, options?: any): Promise<Room<T>> => {
      const room = await client.joinOrCreate<T>(config.name, options);

      room.onStateChange((state) => {
        config.onStateChange?.(state);
      });

      room.onMessage("*", (type, message) => {
        // @ts-ignore
        config.onMessage?.(type, message);
      });

      room.onError((code, message) => {
        config.onError?.(code, message);
      });

      room.onLeave((code) => {
        config.onLeave?.(code);
      });

      return room;
    },
    sendAction: (room: Room<T>, action: string, data: any) => {
      room.send("action", { action, data });
    },
  };
}

export interface ActionDefinition {
  type: string;
  handler: (data: any) => void | Promise<void>;
}

export function defineAction(config: ActionDefinition): ActionDefinition {
  return config;
}
