import logger from "./config/logger.js";
import { buildClient } from "./client.js";

logger.info("Collector started.");

const client = buildClient();
await client.connect();
