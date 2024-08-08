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

# Start the 'playground' agent with the @magickml/pantheon-connector module
pnpm --filter playground dev
```

## End User Features

### defineWorld

```typescript
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
```

### defineAction

```typescript
import { defineAction } from "@magickml/pantheon-connector/runtime/utils";

export default defineAction({
  type: "move",
  handler: async (room, data) => {
    console.log(`Moving in room ${room.name} with data:`, data);
    room.send("move", data);
  },
});
```
