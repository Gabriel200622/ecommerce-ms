import { Router } from "express";
import { MongoUserDataSource } from "../../data/mongo/mongo-user.datasource";
import { UserRepositoryImpl } from "../../domain/repositories/user.repository";
import { UserController } from "./controller";
import { UserMiddleware } from "../../middlewares/user.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoUserDataSource();
    const repository = new UserRepositoryImpl(datasource);
    const controller = new UserController(repository);

    const middleware = new UserMiddleware(datasource);

    router.get("/", middleware.checkAuth, controller.profile);
    router.get("/auth/google", controller.authGoogle);
    router.get("/auth/google/callback", controller.authGoogleCallback);
    router.get("/auth/logout", controller.logOut);

    return router;
  }
}
