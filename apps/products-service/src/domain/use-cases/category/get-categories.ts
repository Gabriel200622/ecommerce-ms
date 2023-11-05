import { CategoryEntity } from "@bigecommerce/utils";
import { CategoryRepository } from "../../interfaces";

interface GetCategoriesUseCase {
  execute(): Promise<CategoryEntity[] | undefined>;
}

export class GetCategories implements GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[] | undefined> {
    const categories = await this.categoryRepository.getCategories();

    return categories;
  }
}
