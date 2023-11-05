import { Subjects } from "./subjects";
import {
  ProductStatus,
  ProductCondition,
  EcommerceFile,
} from "@bigecommerce/utils";

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    author: string;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    status: ProductStatus;
    condition: ProductCondition;
    images: EcommerceFile[];
    videos: EcommerceFile[];
    createdAt: Date;
    updatedAt: Date;
  };
}
