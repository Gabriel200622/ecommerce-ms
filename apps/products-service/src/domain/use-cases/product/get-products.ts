import { ProductEntity } from "@bigecommerce/utils";
import { ProductRepository } from "../../interfaces";

interface GetProductsUseCase {
  execute(): Promise<ProductEntity[] | undefined>;
}

export class GetProducts implements GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[] | undefined> {
    const products = await this.productRepository.getProducts();

    return products;
  }
}
