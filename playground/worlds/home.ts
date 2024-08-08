import { defineRoom } from "@magickml/pantheon-connector";

export default defineRoom({
  name: "example_room",
  onStateChange: (state) => {
    console.log("Room state changed:", state);
  },
  onMessage: (type, message) => {
    console.log("Received message:", type, message);
  },
  onError: (code, message) => {
    console.error("Room error:", code, message);
  },
  onLeave: (code) => {
    console.log("Left room with code:", code);
  },
});
