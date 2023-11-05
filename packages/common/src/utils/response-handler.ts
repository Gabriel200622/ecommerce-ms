import { type Response } from "express";

type Status = 200 | 201 | 400 | 401 | 402 | 403 | 404 | 405 | 429 | 500;

/**
 * Represents a server response.
 * @interface IResponse
 */
interface IResponse {
  res: Response;
  /**
   * A optional message describing the response.
   */
  msg?: string;
  /**
   * Status code.
   * 200: Request was successful,
   * 201: Request was successfully fulfilled and resulted in one or possibly multiple new resources being created,
   * 400: Bad Request,
   * 401: Unauthorized,
   * 402: Payment Required,
   * 403: Forbidden,
   * 404: Not Found,
   * 405: Method Not Allowed,
   * 429: You are being rate limited,
   * 500: Something went wrong,
   */
  status: Status;
  /**
   * An optional error object, if the response is an error.
   */
  error?: any;
  /**
   * An optional data object, if the response contains data.
   */
  data?: any;
  /**
   * Show error in console
   */
  errorLog?: boolean;
}

export const responseHandler = (props: IResponse) => {
  if (props.error) {
    if (props.errorLog) console.log(props.error);
  }

  let message;

  if (props.error) {
    message = props.msg ? props.msg : "Something went wrong";
  } else {
    message = props.msg ? props.msg : "success";
  }

  return props.res.status(props.status).json({
    msg: message,
    data: props.data,
  });
};
