import { LoggerOptions, pino } from "pino";
import env from "./env.js";

const options: LoggerOptions = {};

if (env.environment === "production") {
  options.level = "debug";
  options.transport = {
    target: "pino-pretty",
  };
}

const logger = pino();
export default logger;
