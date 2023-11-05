import { CartEntityProps } from "../interfaces";
import { BaseEntity } from "./base.entity";
import { CartItemEntity } from "./cartItem.entity";

export class CartEntity extends BaseEntity<CartEntityProps> {
  public id: string;
  public userId: string;
  public items?: CartItemEntity[];

  constructor(props: CartEntityProps) {
    super();
    this.validateProps(props, ["id", "userId"]);

    const { id, userId, items } = props;

    this.id = id;
    this.userId = userId;
    this.items = items;
  }
}
