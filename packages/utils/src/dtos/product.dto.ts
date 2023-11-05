import {
  ProductDtoProps,
  ProductCondition,
  ProductStatus,
  EcommerceFile,
} from "../interfaces";
import { BaseDto } from "./base.dto";

export class ProductDto extends BaseDto<ProductDtoProps> {
  id?: string;
  author: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  quantity: number;
  keywords: string[];
  category: string;
  status: ProductStatus;
  condition: ProductCondition;
  images: EcommerceFile[];
  videos: EcommerceFile[];

  constructor(props: ProductDtoProps) {
    super();
    const {
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
    } = this.validateProps(props, [
      "author",
      "title",
      "slug",
      "description",
      "shortDescription",
      "price",
      "quantity",
      "category",
      "status",
      "condition",
    ]);

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
  }
}
