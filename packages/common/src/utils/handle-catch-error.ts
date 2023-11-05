import type { Response } from "express";
import { responseHandler } from "./response-handler";

interface Props {
  error: unknown;
  res: Response;
}

export const handleCatchError = ({ error, res }: Props) => {
  if (error instanceof Error) {
    return responseHandler({
      status: 500,
      msg: error.message ? error.message : "Something went wrong",
      error: error,
      res: res,
    });
  } else {
    return responseHandler({
      status: 500,
      msg: "Something went wrong",
      error: error,
      res: res,
    });
  }
};
