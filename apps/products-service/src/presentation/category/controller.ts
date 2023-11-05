import type { Request, Response } from "express";
import { CategoryRepository } from "../../domain/interfaces";
import { GetCategories } from "../../domain/use-cases/category/get-categories";
import { handleCatchError, responseHandler } from "@bigecommerce/common";
import { CreateCategory } from "../../domain/use-cases/category/create-category";
import { CategoryDto } from "@bigecommerce/utils";

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await new GetCategories(
        this.categoryRepository
      ).execute();

      return responseHandler({
        data: categories,
        res: res,
        status: 200,
      });
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };

  public createCategory = async (req: Request, res: Response) => {
    try {
      const categoryDto = new CategoryDto(req.body);

      const category = await new CreateCategory(
        this.categoryRepository
      ).execute(categoryDto);

      return responseHandler({
        data: category,
        res: res,
        status: 201,
      });
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };
}
