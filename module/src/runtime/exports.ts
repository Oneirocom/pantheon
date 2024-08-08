// @ts-ignore
import { handlers as worlds } from "#pantheon-virtual/worlds";
// @ts-ignore
import { handlers as actions } from "#pantheon-virtual/actions";
import type { BaseVirtualHandler } from "@gtc-nova/kit/runtime";
import type { ActionDefinition } from "../types";
import type { Room } from "colyseus.js";

export const getVirtualWorlds = (): BaseVirtualHandler<Room>[] => worlds;
export const getVirtualActions = (): BaseVirtualHandler<ActionDefinition>[] =>
  actions;
