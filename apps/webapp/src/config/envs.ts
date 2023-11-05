import { from } from "env-var";

const env = from({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const envs = {
  NEXT_PUBLIC_SERVER_URL: env
    .get("NEXT_PUBLIC_SERVER_URL")
    .required()
    .asString(),
};
