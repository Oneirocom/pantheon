# Pantheon - Grimoire World Simulator

## Introduction

Here is an example `World Simulator` for Grimoire apps.

It exists as a colyseus server, and a Grimoire/Nova/Nitro module: `pantheon-connector` that provides core/runtime functionality for the agent.

I like Colyseus but it's not a requirement. The main concept I wanted to demonstrate here is that we can have a module that lets agent's connect/interact with the simulation while also providing the extra features/abstractions that make the development feel like a framework and not just a library.

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

### defineRoom

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
