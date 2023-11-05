import { Router } from "express";
import { MongoCategoryDataSource } from "../../data/mongo/mongo-category.datasource";
import { CategoryRepositoryImpl } from "../../domain/repositories/category.repository";
import { CategoryController } from "./controller";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoCategoryDataSource();
    const repository = new CategoryRepositoryImpl(datasource);
    const controller = new CategoryController(repository);

    router.get("/", controller.getCategories);
    router.post("/create", controller.createCategory);

    return router;
  }
}
