import jwt, { VerifyOptions } from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { envs } from "../config/envs";

export class ManageJwt {
  public static sign(payload: string | Buffer | object, options?: SignOptions) {
    return jwt.sign(payload, envs.JWT_SECRET, options);
  }

  public static verify(
    token: string,
    options?: VerifyOptions & { complete?: false }
  ) {
    return jwt.verify(token, envs.JWT_SECRET, options);
  }
}
