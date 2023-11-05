import { CategoryDto, CategoryEntity } from "@bigecommerce/utils";
import { CategoryRepository } from "../../interfaces";

interface CreateCategoryUseCase {
  execute(categoryDto: CategoryDto): Promise<CategoryEntity | undefined>;
}

export class CreateCategory implements CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(categoryDto: CategoryDto): Promise<CategoryEntity | undefined> {
    const slugExists = await this.categoryRepository.getCategoryBySlug(
      categoryDto.slug
    );
    const nameExists = await this.categoryRepository.getCategoryByName(
      categoryDto.name
    );
    if (slugExists) throw new Error("Slug already exists");
    if (nameExists) throw new Error("Name already exists");

    const category = await this.categoryRepository.create(categoryDto);

    return category;
  }
}
