import { Router } from "express";
import { CartRepositoryImpl } from "../../domain/repositories/cart.repository";
import { CartController } from "./controller";
import { requireAuth } from "@bigecommerce/common";
import { MongoCartDataSource } from "../../data/mongo/cart.datasource";

export class CartRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoCartDataSource();
    const repository = new CartRepositoryImpl(datasource);
    const controller = new CartController(repository);

    router.get("/", requireAuth, controller.getMyCart);
    router.post("/add-item", requireAuth, controller.addItemToCart);
    router.delete(
      "/remove-item/:cartItemId",
      requireAuth,
      controller.removeItemFromCart
    );

    return router;
  }
}
