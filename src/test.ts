import 'dotenv/config';
import { requireEnv, OptionalEnv, requireEnvWithDefaults, validateEnumEnv } from './index'

const env = requireEnv({
  DB_URL: "string",
  PORT: "number",
  DEBUG: "boolean",
});

const opt = OptionalEnv({
  REDIS_URL: "string",
});

const withDefaults = requireEnvWithDefaults({
  PORT: ["number", 3000],
  DEBUG: ["boolean", false],
});

const LOG_LEVEL = validateEnumEnv("LOG_LEVEL", ["info", "warn", "error"] as const);

console.log(env, opt, withDefaults, LOG_LEVEL);

