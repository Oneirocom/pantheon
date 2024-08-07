import { Room, Client } from "@colyseus/core";
import { SimulationState, Agent, AgentAction } from "@magickml/pantheon-shared";

export class AgentRoom extends Room<SimulationState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new SimulationState());

    this.onMessage(
      "updateWorldState",
      (client, message: { key: string; value: any }) => {
        this.state.worldState.properties.set(message.key, message.value);
      }
    );

    this.onMessage(
      "agentAction",
      (client, message: { agentId: string; action: AgentAction }) => {
        const { agentId, action } = message;
        const agent = this.state.agents.get(agentId);
        if (agent) {
          switch (action.type) {
            case "move":
              agent.x += action.dx;
              agent.y += action.dy;
              break;
            case "interact":
              // Implement interaction logic
              break;
            // Add more action types as needed
          }
        }
      }
    );

    this.setSimulationInterval(
      (deltaTime) => this.update(deltaTime),
      1000 / 60
    );
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const agentId = client.sessionId;
    const newAgent = new Agent(
      agentId,
      Math.random() * 100,
      Math.random() * 100
    );
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
      // Implement agent behavior here
    });
    this.state.worldState.time += deltaTime;
  }
}
