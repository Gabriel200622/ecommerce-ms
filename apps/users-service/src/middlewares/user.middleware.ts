import { NextFunction, Response, Request } from "express";
import {
  getReqToken,
  handleCatchError,
  responseHandler,
} from "@bigecommerce/common";
import { UserDataSource } from "../data/mongo/types";
import { ManageJwt } from "../modules/manage-jwt";

export class UserMiddleware {
  constructor(private readonly userDataSource: UserDataSource) {}

  public checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = getReqToken(req);

    if (!token || token.startsWith("null") || token.startsWith("undefined")) {
      return responseHandler({
        status: 401,
        msg: "Not logged in",
        res: res,
      });
    }

    try {
      const data: any = ManageJwt.verify(token);
      const user = await this.userDataSource.getUserById(data.id);

      if (!user) {
        return responseHandler({
          status: 401,
          msg: "Not logged in",
          res: res,
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };
}
