import {
  CategoryDto,
  CategoryEntity,
  ProductDto,
  ProductEntity,
} from "@bigecommerce/utils";

export interface ProductRepository {
  create(productDto: ProductDto): Promise<ProductEntity | undefined>;
  getProductById(id: string): Promise<ProductEntity | undefined>;
  getProductBySlug(slug: string): Promise<ProductEntity | undefined>;
  getProducts(): Promise<ProductEntity[] | undefined>;
}

export interface CategoryRepository {
  create(categoryDto: CategoryDto): Promise<CategoryEntity | undefined>;
  getCategoryByName(name: string): Promise<CategoryEntity | undefined>;
  getCategoryBySlug(slug: string): Promise<CategoryEntity | undefined>;
  getCategories(): Promise<CategoryEntity[] | undefined>;
}
