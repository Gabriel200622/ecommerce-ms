import { CartRepository } from "../../interfaces";

interface RemoveItemFromCartUseCase {
  execute(cartItemId: string, userId: string): Promise<string | undefined>;
}

export class RemoveItemFromCart implements RemoveItemFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(
    cartItemId: string,
    userId: string
  ): Promise<string | undefined> {
    const msg = this.cartRepository.removeItemFromCart(cartItemId, userId);

    return msg;
  }
}
