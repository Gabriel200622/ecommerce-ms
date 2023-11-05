import { BadRequestError } from "@bigecommerce/common";
import { ProductRepository } from "../../interfaces";
import { ProductDto, ProductEntity } from "@bigecommerce/utils";

interface CreateProductUseCase {
  execute(productDto: ProductDto): Promise<ProductEntity | undefined>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productDto: ProductDto): Promise<ProductEntity | undefined> {
    const slugExists = await this.productRepository.getProductBySlug(
      productDto.slug
    );
    if (slugExists) {
      throw new BadRequestError("Slug already exists");
    }

    const product = await this.productRepository.create(productDto);

    return product;
  }
}
