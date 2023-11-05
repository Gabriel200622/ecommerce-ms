import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { responseHandler } from "../utils/response-handler";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler({
      status: 400,
      data: errors.array(),
      res: res,
      msg: "Invalid request parameters",
    });
  }

  next();
};
