import axios from "axios";
import type { Request, Response, NextFunction } from "express";
import { responseHandler } from "../utils/response-handler";
import { envs } from "../config/envs";
import { handleCatchError } from "../utils/handle-catch-error";
import { getReqToken } from "../utils/get-req-token";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getReqToken(req);

  if (!token || token.startsWith("null")) {
    return responseHandler({
      status: 401,
      msg: "Not logged in",
      res: res,
    });
  }

  try {
    const { data } = await axios.get(envs.USER_SERVICE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data.data.id) {
      return responseHandler({
        status: 401,
        msg: "Not logged in",
        res: res,
      });
    }

    req.user = data.data;

    next();
  } catch (error) {
    return handleCatchError({ error, res });
  }
};
