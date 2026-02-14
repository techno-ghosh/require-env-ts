require-env-ts

Fail-fast, type-safe environment variable validation for Node.js (TypeScript-first).

Lightweight. Zero dependencies. Backend-focused.

Features

-> Runtime validation of environment variables

-> Fully typed return values

-> Support for required variables

-> Support for optional variables

-> Support for default values

-> Enum validation helper

-> Zero dependencies

Installation
npm install require-env-ts


If you're using a .env file:

npm install dotenv


Then load it at the top of your entry file:

import "dotenv/config";

Usage

1️⃣ requireEnv()

Validate required environment variables.

Throws an error if:

A variable is missing

A variable cannot be parsed into the expected type

Example
import { requireEnv } from "require-env-ts";

const env = requireEnv({
  DB_URL: "string",
  PORT: "number",
  DEBUG: "boolean"
});

console.log(env.PORT);  // number
console.log(env.DEBUG); // boolean



2️⃣ optionalEnv()

Validate environment variables but do not throw if missing.

Missing variables simply return as undefined.

Example
import { optionalEnv } from "require-env-ts";

const opt = optionalEnv({
  REDIS_URL: "string",
  TIMEOUT: "number"
});

if (opt.REDIS_URL) {
  console.log(opt.REDIS_URL);
}

Returned Type
{
  REDIS_URL?: string;
  TIMEOUT?: number;
}



3️⃣ requireEnvWithDefaults()

Validate environment variables and apply default values if missing.

Example
import { requireEnvWithDefaults } from "require-env-ts";

const env = requireEnvWithDefaults({
  PORT: ["number", 3000],
  DEBUG: ["boolean", false]
});

console.log(env.PORT);  // number



4️⃣ validateEnumEnv()

Ensure a variable is one of a predefined set of values.

Useful for:

NODE_ENV

LOG_LEVEL

APP_MODE

Example
import { validateEnumEnv } from "require-env-ts";

const NODE_ENV = validateEnumEnv(
  "NODE_ENV",
  ["development", "production", "test"] as const
);


Returned Type
"development" | "production" | "test"


Fully typed union — not just string.

🧠 Supported Types

The library supports:

"string"

"number"

"boolean"

All environment variables are parsed from process.env.

⚠️ Important Notes

All values from process.env are strings.

Boolean values must be exactly:

"true"

"false"

Numbers must be valid numeric strings.

.env loading is not handled by this library — use dotenv.

🧪 Example .env File
DB_URL=postgres://localhost
PORT=3000
DEBUG=true
NODE_ENV=development

🏗 Recommended Pattern
import "dotenv/config";
import {
  requireEnv,
  requireEnvWithDefaults,
  validateEnumEnv
} from "require-env-ts";

const core = requireEnv({
  DB_URL: "string"
});

const config = requireEnvWithDefaults({
  PORT: ["number", 3000],
  DEBUG: ["boolean", false]
});

const NODE_ENV = validateEnumEnv(
  "NODE_ENV",
  ["development", "production", "test"] as const
);