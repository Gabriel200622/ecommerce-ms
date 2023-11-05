import { CartItemDto, CartItemEntity } from "@bigecommerce/utils";
import { CartRepository } from "../../interfaces";

interface AddItemToCartUseCase {
  execute(
    cartItemDto: CartItemDto,
    userId: string
  ): Promise<CartItemEntity | undefined>;
}

export class AddItemToCart implements AddItemToCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(
    cartItemDto: CartItemDto,
    userId: string
  ): Promise<CartItemEntity | undefined> {
    const cartItem = await this.cartRepository.addItemToCart(
      cartItemDto,
      userId
    );

    return cartItem;
  }
}
