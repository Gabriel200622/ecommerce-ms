import { Router } from "express";
import { MongoProductDataSource } from "../../data/mongo/mongo-product.datasource";
import { ProductRepositoryImpl } from "../../domain/repositories/product.repository";
import { ProductController } from "./controller";
import { requireAuth, validateRequest } from "@bigecommerce/common";
import { ProductValidator } from "../../validators/product-validator";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoProductDataSource();
    const repository = new ProductRepositoryImpl(datasource);
    const controller = new ProductController(repository);
    const validator = new ProductValidator();

    router.post(
      "/create",
      requireAuth,
      validator.createProductValidator(),
      validateRequest,
      controller.createProduct
    );
    router.get("/", controller.getProducts);
    router.get("/p/:productId", controller.getProduct);

    return router;
  }
}
