import {
  CartDto,
  CartEntity,
  CartItemDto,
  CartItemEntity,
} from "@bigecommerce/utils";

export interface CartRepository {
  create(cartDto: CartDto): Promise<CartEntity | undefined>;
  getMyCart(userId: string): Promise<CartEntity | undefined>;
  addItemToCart(
    cartItemDto: CartItemDto,
    userId: string
  ): Promise<CartItemEntity | undefined>;
  removeItemFromCart(
    cartItemId: string,
    userId: string
  ): Promise<string | undefined>;
}
