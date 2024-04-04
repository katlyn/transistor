import { secret, strictVerify, transform } from "env-verifier";

// This object contains any default values that we want to be present in the environment. This is good for defining
// default ports, hostnames, or similar. All values must be a string.
export const defaults: Record<string, string> = {
  NODE_ENV: "production",
};

export const config = {
  environment: "NODE_ENV",
  discord: {
    token: secret("DISCORD_TOKEN"),
  },
};

const env = strictVerify<typeof config>(config, {
  ...defaults,
  ...process.env,
});

export default env;
