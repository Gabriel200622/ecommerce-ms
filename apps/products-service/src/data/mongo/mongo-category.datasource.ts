import { CategoryDto, CategoryEntity } from "@bigecommerce/utils";
import { CategoryDataSource } from "./types";
import { Category } from "./models/Category";

export class MongoCategoryDataSource implements CategoryDataSource {
  async create(categoryDto: CategoryDto): Promise<CategoryEntity | undefined> {
    const category = await Category.build(categoryDto);

    const newCategory = new CategoryEntity(category);

    return newCategory;
  }

  async getCategoryByName(name: string): Promise<CategoryEntity | undefined> {
    const categoryMongo = await Category.findOne({ name });

    if (!categoryMongo) return undefined;

    const category = new CategoryEntity({ ...categoryMongo });

    return category;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity | undefined> {
    const categoryMongo = await Category.findOne({ slug });

    if (!categoryMongo) return undefined;

    const category = new CategoryEntity({ ...categoryMongo });

    return category;
  }

  async getCategories(): Promise<CategoryEntity[] | undefined> {
    const categoriesMongo = await Category.find();

    const categories = categoriesMongo.map(
      (category) => new CategoryEntity(category)
    );

    return categories;
  }
}
