import { CartItemEntity } from "../entities/cartItem.entity";
import { UserEntity } from "../entities/user.entity";

export interface UserDtoProps {
  id?: string;
  name: string;
  username: string;
  email: string;
  userImageId?: string;
  userImageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserEntityProps {
  id: string;
  name: string;
  username: string;
  email: string;
  userImageId: string | null;
  userImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDtoProps {
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
}

export interface ProductEntityProps {
  id: string;
  author: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  quantity: number;
  keywords: string[];
  category?: string;
  status: ProductStatus;
  condition: ProductCondition;
  images: EcommerceFile[];
  videos: EcommerceFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDtoProps {
  id?: string;
  name: string;
  slug: string;
  description: string;
}

export interface CategoryEntityProps {
  id?: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CartDtoProps {
  id?: string;
  userId: string;
}

export interface CartEntityProps {
  id: string;
  userId: string;
  items?: CartItemEntity[];
}

export interface CartItemDtoProps {
  id?: string;
  product: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemEntityProps {
  id: string;
  cart: string;
  product: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewDtoProps {
  id?: string;
  userId: string;
  productId: string;
  content: string;
  rating: number;
}

export interface ReviewEntityProps {
  id: string;
  userId: string;
  productId: string;
  content: string;
  rating: number;
}

// Enums
export enum ProductStatus {
  Draft = "draft",
  Published = "published",
}

export enum ProductCondition {
  New = "new",
  Used = "used",
  Broken = "broken",
}

export enum ProductpackagingOptions {
  Normal = "normal",
  Gift = "Gift",
}

// Other
export interface EcommerceFile {
  publicId: string;
  secureUrl: string;
}

export const productConditionsArray = Object.values(
  ProductCondition
) as ProductCondition[];

export const productStatusArray = Object.values(
  ProductStatus
) as ProductStatus[];
