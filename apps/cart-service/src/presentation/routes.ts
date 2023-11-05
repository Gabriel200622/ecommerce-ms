import { Router } from "express";
import { CartRoutes } from "./cart/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/service", (req, res) => res.json({ msg: "Cart Service" }));

    router.use("/", CartRoutes.routes);

    return router;
  }
}
