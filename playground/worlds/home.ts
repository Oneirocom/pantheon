import { defineRoom } from "@magickml/pantheon-connector/runtime/utils";

export default defineRoom({
  name: "agent_world",
  autoJoin: true,
  onStateChange: (state) => {
    console.log("State changed:", state);
  },
  onMessage: (message) => {
    console.log("Message received:", message);
  },
});
