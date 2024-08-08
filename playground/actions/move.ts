import { defineAction } from "@magickml/pantheon-connector";

// Define an action
export default defineAction({
  type: "move",
  handler: async (data) => {
    console.log("Processing move action:", data);
    // Implement action logic here
  },
});
