import "dotenv/config";
import env from "env-var";

export const envs = {
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  USER_SERVICE_URL: env.get("USER_SERVICE_URL").required().asString(),
};
