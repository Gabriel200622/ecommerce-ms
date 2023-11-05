import { envs } from "./envs";

export const allowedDomains = [
  envs.APP_URL,
  envs.CLIENT_URL,
  "http://localhost",
];

export const configCors = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      return callback(
        new Error(
          `This site ${origin} does not have an access. Only specific domains are allowed to access it.`
        ),
        false
      );
    }

    return callback(null, true);
  },
  credentials: true,
};
