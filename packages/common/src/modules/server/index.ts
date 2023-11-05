import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import express, { type Router, type Express } from "express";

export interface ServerOptions {
  port: number;
  routes: Router;
  configCors: cors.CorsOptions;
}

export class Server {
  public app: Express = express();
  public server: http.Server;

  constructor({ configCors, port, routes }: ServerOptions) {
    this.setupMiddlewares(configCors);
    this.app.use(routes);

    this.server = this.app.listen(port, () => {
      console.log(`🚀 Server on port ${port}`);
    });
  }

  private setupMiddlewares(configCors: cors.CorsOptions) {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors(configCors));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
      })
    );
  }
}
