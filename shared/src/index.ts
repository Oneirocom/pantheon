import { Schema, MapSchema, type } from "@colyseus/schema";

interface AgentAction {
  type: string;
  [key: string]: any;
}

class Agent extends Schema {
  @type("string") id: string;
  @type("number") x: number;
  @type("number") y: number;

  constructor(id: string, x: number, y: number) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

class WorldState extends Schema {
  @type("number") time: number = 0;
  @type({ map: "string" }) properties = new MapSchema<string>();
}

export class SimulationState extends Schema {
  @type({ map: Agent }) agents = new MapSchema<Agent>();
  @type(WorldState) worldState = new WorldState();
}

export { Agent, type AgentAction };
