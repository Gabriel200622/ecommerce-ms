import { CartItemDtoProps } from "../interfaces";
import { BaseDto } from "./base.dto";

export class CartItemDto extends BaseDto<CartItemDtoProps> {
  quantity: number;
  product: string;

  constructor(props: CartItemDtoProps) {
    super();
    const { quantity, product } = this.validateProps(props, [
      "quantity",
      "product",
    ]);

    this.quantity = quantity;
    this.product = product;
  }
}
