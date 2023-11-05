import {
  CartDto,
  CartEntity,
  CartItemDto,
  CartItemEntity,
} from "@bigecommerce/utils";
import { CartDataSource } from "../../data/mongo/types";
import { CartRepository } from "../interfaces";

export class CartRepositoryImpl implements CartRepository {
  cartDataSource: CartDataSource;
  constructor(cartDataSource: CartDataSource) {
    this.cartDataSource = cartDataSource;
  }

  async create(cartDto: CartDto): Promise<CartEntity | undefined> {
    const cart = await this.cartDataSource.create(cartDto);

    return cart;
  }

  async getMyCart(userId: string): Promise<CartEntity | undefined> {
    const cart = await this.cartDataSource.getMyCart(userId);

    return cart;
  }

  async addItemToCart(
    cartItemDto: CartItemDto,
    userId: string
  ): Promise<CartItemEntity | undefined> {
    const item = await this.cartDataSource.addItemToCart(cartItemDto, userId);

    return item;
  }

  async removeItemFromCart(
    cartItemId: string,
    userId: string
  ): Promise<string | undefined> {
    const msg = await this.cartDataSource.removeItemFromCart(
      cartItemId,
      userId
    );

    return msg;
  }
}
