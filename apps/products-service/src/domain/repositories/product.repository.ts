import { ProductDto, ProductEntity } from "@bigecommerce/utils";
import { ProductDataSource } from "../../data/mongo/types";
import { ProductRepository } from "../interfaces";

export class ProductRepositoryImpl implements ProductRepository {
  productDataSource: ProductDataSource;
  constructor(productDataSource: ProductDataSource) {
    this.productDataSource = productDataSource;
  }

  async create(productDto: ProductDto): Promise<ProductEntity | undefined> {
    const product = await this.productDataSource.create(productDto);

    return product;
  }

  async getProductById(id: string): Promise<ProductEntity | undefined> {
    const product = await this.productDataSource.getProductById(id);

    return product;
  }

  async getProductBySlug(slug: string): Promise<ProductEntity | undefined> {
    const product = await this.productDataSource.getProductBySlug(slug);

    return product;
  }

  async getProducts(): Promise<ProductEntity[] | undefined> {
    const products = await this.productDataSource.getProducts();

    return products;
  }
}
