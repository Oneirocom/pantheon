// @ts-ignore
import { handlers as worlds } from "#pantheon-virtual/worlds";
// @ts-ignore
import { handlers as actions } from "#pantheon-virtual/actions";
import type { BaseVirtualHandler } from "@gtc-nova/kit/runtime";
import type { RoomDefinition, ActionDefinition } from "../types";

export const getVirtualWorlds = (): BaseVirtualHandler<RoomDefinition>[] =>
  worlds;
export const getVirtualActions = (): BaseVirtualHandler<ActionDefinition>[] =>
  actions;
