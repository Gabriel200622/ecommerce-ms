import { CartDtoProps } from "../interfaces";
import { BaseDto } from "./base.dto";

export class CartDto extends BaseDto<CartDtoProps> {
  userId: string;

  constructor(props: CartDtoProps) {
    super();
    const { userId } = this.validateProps(props, ["userId"]);

    this.userId = userId;
  }
}
