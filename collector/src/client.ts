import { Client } from "oceanic.js";
import env from "./config/env.js";
import baseLogger from "./config/logger.js";

const logger = baseLogger.child({ component: "client" });

export function buildClient() {
  logger.trace("Building new client.");
  const client = new Client({
    auth: `Bot ${env.discord.token.reveal()}`,
  });

  client.on("ready", () => {
    logger.info("Ready event fired.");
    logger.info(`Connected as ${client.user.tag}.`);
  });

  client.on("error", (error) => {
    console.error({ error });
  });

  return client;
}
