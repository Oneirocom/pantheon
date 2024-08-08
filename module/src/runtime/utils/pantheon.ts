import { Client } from "colyseus.js";

// TODO: refactor to use from nitro.pantheon.client

let client: Client;

export function initializePantheon(serverUrl: string = "ws://localhost:2567") {
  client = new Client(serverUrl);
  return client;
}

export function getPantheonClient() {
  if (!client) {
    throw new Error(
      "Pantheon client not initialized. Call initializePantheon first."
    );
  }
  return client;
}
