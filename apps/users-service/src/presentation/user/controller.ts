import axios from "axios";
import type { Request, Response } from "express";
import { UserDto } from "@bigecommerce/utils";
import { AuthGoogle } from "../../domain/use-cases/user/auth-google";
import { generateJWT, generateUsername } from "../../utils";
import { handleCatchError, responseHandler } from "@bigecommerce/common";
import { OAuth2Client } from "google-auth-library";
import { envs } from "../../config/envs";
import { UserRepository } from "../../domain/interfaces";
import { UserCreatedPublisher } from "../../events/publishers/user-created-publisher";
import { natsWrapper } from "../../modules/nats";
import { ManageCookie } from "../../modules/manage-cookie";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  public authGoogleCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
      const oAuth2Client = new OAuth2Client({
        clientId: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        redirectUri: `${envs.APP_URL}/auth/google/callback`,
      });

      const tokenRes = await oAuth2Client.getToken(code as string);
      await oAuth2Client.setCredentials(tokenRes.tokens);

      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenRes.tokens.access_token}`
      );

      if (!data) {
        return responseHandler({
          status: 401,
          msg: "Token is invalid",
          res: res,
        });
      }

      const userDto = new UserDto({
        name: data.name,
        username: generateUsername(data.email),
        email: data.email,
        userImageUrl: data.picture,
      });

      const user = await new AuthGoogle(this.userRepository).execute(userDto);

      if (user) {
        const token = generateJWT(user.id);

        new UserCreatedPublisher(natsWrapper.client).publish({
          id: user.id,
          name: user.name,
          username: user.username,
          userImageId: user.userImageId,
          userImageUrl: user.userImageUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });

        const serialized = ManageCookie.serialize(
          "token",
          token,
          1000 * 60 * 60 * 24 * 30
        );

        res.setHeader("Set-Cookie", serialized);
        return res.redirect(envs.PROXY_URL);
      } else {
        return responseHandler({
          status: 401,
          msg: "Something went wrong",
          res: res,
        });
      }
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };

  public authGoogle = async (req: Request, res: Response) => {
    try {
      const oAuth2Client = new OAuth2Client({
        clientId: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        redirectUri: `${envs.APP_URL}/auth/google/callback`,
      });

      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.profile openid email",
        prompt: "consent",
      });

      res.redirect(authorizeUrl);
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };

  public profile = async (req: Request, res: Response) => {
    try {
      return responseHandler({
        data: req.user,
        status: 200,
        msg: "success",
        res: res,
      });
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };

  public logOut = async (req: Request, res: Response) => {
    try {
      const serialized = ManageCookie.serialize("token", "", 0);

      res.setHeader("Set-Cookie", serialized);
      return responseHandler({
        msg: "success",
        res: res,
        status: 200,
      });
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };
}
