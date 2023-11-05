import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),

  APP_URL: env.get("APP_URL").required().asString(),
  CLIENT_URL: env.get("CLIENT_URL").required().asString(),
};
