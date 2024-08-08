import { Room } from "colyseus.js";
import type { RoomDefinition } from "../../types";

export function defineRoom<T = any>(
  config: RoomDefinition<T>
): RoomDefinition<T> {
  return config;
}

export interface ActionDefinition {
  type: string;
  handler: (room: Room, data: any) => void | Promise<void>;
}

export function defineAction(config: ActionDefinition): ActionDefinition {
  return config;
}
