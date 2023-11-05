import { Product } from "./models/Product";
import { ProductDataSource } from "./types";
import { ProductDto, ProductEntity } from "@bigecommerce/utils";

export class MongoProductDataSource implements ProductDataSource {
  async create(productDto: ProductDto): Promise<ProductEntity | undefined> {
    const product = await Product.build(productDto);

    const newProduct = new ProductEntity(product);

    return newProduct;
  }

  async getProductById(id: string): Promise<ProductEntity | undefined> {
    const productMongo = await Product.findById(id);

    if (!productMongo) return undefined;

    const product = new ProductEntity(productMongo);

    return product;
  }

  async getProductBySlug(slug: string): Promise<ProductEntity | undefined> {
    const productMongo = await Product.findOne({ slug });

    if (!productMongo) return undefined;

    const product = new ProductEntity(productMongo);

    return product;
  }

  async getProducts(): Promise<ProductEntity[] | undefined> {
    const productsMongo = await Product.find().sort({
      createdAt: "desc",
    });

    const products = productsMongo.map((product) => {
      return new ProductEntity(product);
    });

    return products;
  }
}
