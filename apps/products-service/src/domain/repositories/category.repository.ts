import { CategoryDto, CategoryEntity } from "@bigecommerce/utils";
import { CategoryDataSource } from "../../data/mongo/types";
import { CategoryRepository } from "../interfaces";

export class CategoryRepositoryImpl implements CategoryRepository {
  categoryDataSource: CategoryDataSource;
  constructor(categoryDataSource: CategoryDataSource) {
    this.categoryDataSource = categoryDataSource;
  }

  async create(categoryDto: CategoryDto): Promise<CategoryEntity | undefined> {
    const category = await this.categoryDataSource.create(categoryDto);

    return category;
  }

  async getCategoryByName(name: string): Promise<CategoryEntity | undefined> {
    const category = await this.categoryDataSource.getCategoryByName(name);

    return category;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity | undefined> {
    const category = await this.categoryDataSource.getCategoryBySlug(slug);

    return category;
  }

  async getCategories(): Promise<CategoryEntity[] | undefined> {
    const categories = await this.categoryDataSource.getCategories();

    return categories;
  }
}
