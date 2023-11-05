import { CartEntity } from "@bigecommerce/utils";
import { CartRepository } from "../../interfaces";

interface GetMyCartUseCase {
  execute(userId: string): Promise<CartEntity | undefined>;
}

export class GetMyCart implements GetMyCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string): Promise<CartEntity | undefined> {
    const cart = await this.cartRepository.getMyCart(userId);

    return cart;
  }
}
