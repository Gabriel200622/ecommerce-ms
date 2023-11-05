import { Router } from "express";
import { ProductRoutes } from "./product/routes";
import { CategoryRoutes } from "./category/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/service", (req, res) => res.json({ msg: "Products Service" }));

    router.use("/", ProductRoutes.routes);
    router.use("/categories", CategoryRoutes.routes);

    return router;
  }
}
