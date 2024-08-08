# Pantheon - Grimoire World Simulator

## Introduction

Here is an example `World Simulator` for Grimoire apps.

It exists as a colyseus server, and a Grimoire/Nova/Nitro module: `pantheon-connector` that provides core/runtime functionality for the agent.

## Installation

```bash
# Install
pnpm install

# Build
pnpm -r build

# Start the server
pnpm --filter pantheon start

# Start the 'playground' agent with the
```

## End User Features

### defineWorld

```typescript
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
```

### defineAction

```typescript
import { defineAction } from "@magickml/pantheon-connector";

// Define an action
export default defineAction({
  type: "move",
  handler: async (data) => {
    console.log("Processing move action:", data);
    // Implement action logic here
  },
});
```
