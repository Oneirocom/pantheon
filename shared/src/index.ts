import { Schema, MapSchema, type } from "@colyseus/schema";

class BaseAgent extends Schema {
  @type("string") id: string;
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("string") state: string = "idle";
  @type({ map: "string" }) properties = new MapSchema<string>();

  constructor(id: string) {
    super();
    this.id = id;
  }
}

class BaseWorldState extends Schema {
  @type("number") time: number = 0;
  @type({ map: "string" }) properties = new MapSchema<string>();
}

class BaseSimulationState extends Schema {
  @type({ map: BaseAgent }) agents = new MapSchema<BaseAgent>();
  @type(BaseWorldState) worldState = new BaseWorldState();
}

export { BaseAgent, BaseWorldState, BaseSimulationState };
