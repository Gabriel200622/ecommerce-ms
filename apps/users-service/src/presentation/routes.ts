import { Router } from "express";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/service", (req, res) => res.json({ msg: "User Service" }));

    router.use("/", UserRoutes.routes);

    return router;
  }
}
