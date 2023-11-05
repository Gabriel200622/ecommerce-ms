import { AxiosResponse } from "axios";
import {
  EcommerceFile,
  ProductCondition,
  ProductStatus,
} from "@bigecommerce/utils";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  userImageId: string;
  userImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
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

export interface IProductAxios extends AxiosResponse {
  data: {
    msg: string;
    data?: IProduct[];
  };
}

export interface IDataAxios extends AxiosResponse {
  data: {
    msg: string;
    data?: IUser;
  };
}
