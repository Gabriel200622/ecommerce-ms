import { ManageJwt } from "../modules/manage-jwt";

export const generateUsername = (email: string) => {
  const usernamePrefix = email.split("@")[0];
  const randomSuffix = generateId();

  return usernamePrefix + randomSuffix;
};

export const generateId = () => {
  const random = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);
  return random + date;
};

export const generateJWT = (id: string) => {
  return ManageJwt.sign(
    { id },
    {
      expiresIn: "30d",
    }
  );
};
