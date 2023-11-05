import { ProductEntity } from "@bigecommerce/utils";
import { ProductRepository } from "../../interfaces";

interface GetProductByIdUseCase {
  execute(id: string): Promise<ProductEntity | undefined>;
}

export class GetProductById implements GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity | undefined> {
    const product = await this.productRepository.getProductById(id);

    return product;
  }
}
