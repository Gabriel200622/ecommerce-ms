import {
  EcommerceFile,
  ProductCondition,
  ProductEntityProps,
  ProductStatus,
} from "../interfaces";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

export class ProductEntity extends BaseEntity<ProductEntityProps> {
  public id: string;
  public author: string;
  public title: string;
  public slug: string;
  public description: string;
  public shortDescription: string;
  public price: number;
  public quantity: number;
  public keywords: string[];
  category?: string;
  public status: ProductStatus;
  public condition: ProductCondition;
  public images: EcommerceFile[];
  public videos: EcommerceFile[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: ProductEntityProps) {
    super();
    this.validateProps(props, [
      "id",
      "author",
      "title",
      "slug",
      "description",
      "shortDescription",
      "price",
      "quantity",
      "keywords",
      "status",
      "category",
      "condition",
      "images",
      "videos",
      "createdAt",
      "updatedAt",
    ]);

    const {
      id,
      author,
      title,
      slug,
      description,
      shortDescription,
      price,
      quantity,
      keywords,
      category,
      status,
      condition,
      images,
      videos,
      createdAt,
      updatedAt,
    } = props;

    this.id = id;
    this.author = author;
    this.author = author;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.shortDescription = shortDescription;
    this.price = price;
    this.quantity = quantity;
    this.keywords = keywords;
    this.category = category;
    this.status = status;
    this.condition = condition;
    this.images = images;
    this.videos = videos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
