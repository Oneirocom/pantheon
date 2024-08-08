import { defineAction } from "@magickml/pantheon-connector/runtime/utils";

export default defineAction({
  type: "move",
  handler: async (room, data) => {
    console.log(`Moving in room ${room.name} with data:`, data);
    room.send("move", data);
  },
});
