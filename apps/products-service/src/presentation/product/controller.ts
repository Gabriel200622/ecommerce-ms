import type { Request, Response } from "express";
import { ProductRepository } from "../../domain/interfaces";
import { GetProducts } from "../../domain/use-cases/product/get-products";
import { responseHandler, handleCatchError } from "@bigecommerce/common";
import { CreateProduct } from "../../domain/use-cases/product/create-product";
import { GetProductById } from "../../domain/use-cases/product/get-product-id";
import { ProductDto } from "@bigecommerce/utils";
import { ProductCreatedPublisher } from "../../events/publishers/product-created-publisher";
import { natsWrapper } from "../../modules/nats";

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  public createProduct = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return responseHandler({
          status: 500,
          msg: "Something went wrong",
          res: res,
        });
      }

      const productDto = new ProductDto({
        author: req.user.id,
        category: req.body.categoryId,
        condition: req.body.condition,
        description: req.body.description,
        images: req.body.images,
        keywords: req.body.keywords,
        price: req.body.price,
        quantity: req.body.quantity,
        shortDescription: req.body.shortDescription,
        slug: req.body.slug,
        status: req.body.status,
        title: req.body.title,
        videos: req.body.videos,
        id: req.body.id,
      });

      const product = await new CreateProduct(this.productRepository).execute(
        productDto
      );

      if (!product)
        return responseHandler({
          status: 500,
          msg: "Something went wrong",
          res: res,
        });

      new ProductCreatedPublisher(natsWrapper.client).publish({
        id: product.id,
        author: product.author,
        title: product.title,
        slug: product.slug,
        condition: product.condition,
        status: product.status,
        price: product.price,
        quantity: product.quantity,
        images: product.images,
        videos: product.videos,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });

      return responseHandler({
        data: product,
        status: 201,
        res: res,
      });
    } catch (error: unknown) {
      return handleCatchError({ error, res });
    }
  };

  public getProducts = async (req: Request, res: Response) => {
    try {
      const products = await new GetProducts(this.productRepository).execute();

      return responseHandler({
        data: products,
        status: 200,
        res: res,
      });
    } catch (error) {
      return handleCatchError({ error, res });
    }
  };

  public getProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const product = await new GetProductById(this.productRepository).execute(
        productId
      );

      if (!product)
        return responseHandler({
          res: res,
          status: 404,
          msg: "Product not found",
        });

      return responseHandler({
        data: product,
        status: 200,
        res: res,
      });
    } catch (error) {
      handleCatchError({ error, res });
    }
  };
}
