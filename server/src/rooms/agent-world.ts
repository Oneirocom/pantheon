import { Room, Client } from "@colyseus/core";
import { BaseAgent, BaseSimulationState } from "@magickml/pantheon-shared";

class GenericSimulationRoom<T extends BaseSimulationState> extends Room<T> {
  maxClients = 100;

  onCreate(options: any) {
    this.setState(new BaseSimulationState() as T);

    this.onMessage("agentAction", this.handleAgentAction.bind(this));
    this.onMessage("customAction", this.handleCustomAction.bind(this));

    this.setSimulationInterval(
      (deltaTime) => this.update(deltaTime),
      1000 / 60
    );
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const agentId = client.sessionId;
    const newAgent = new BaseAgent(agentId);
    this.state.agents.set(agentId, newAgent);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.agents.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  update(deltaTime: number): void {
    this.state.agents.forEach((agent) => {
      this.updateAgent(agent, deltaTime);
    });
    this.state.worldState.time += deltaTime;
    this.updateWorld(deltaTime);
  }

  handleAgentAction(
    client: Client,
    message: { agentId: string; action: string; data?: any }
  ) {
    const { agentId, action, data } = message;
    const agent = this.state.agents.get(agentId);
    if (agent) {
      this.processAgentAction(agent, action, data);
    }
  }

  handleCustomAction(client: Client, message: { type: string; data: any }) {
    const { type, data } = message;
    this.processCustomAction(type, data);
  }

  // Methods to be overridden by specific room implementations
  protected updateAgent(agent: BaseAgent, deltaTime: number): void {}
  protected updateWorld(deltaTime: number): void {}
  protected processAgentAction(
    agent: BaseAgent,
    action: string,
    data?: any
  ): void {}
  protected processCustomAction(type: string, data: any): void {}
}

export { GenericSimulationRoom };
