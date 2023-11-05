import { CartItemEntityProps } from "../interfaces";
import { BaseEntity } from "./base.entity";

export class CartItemEntity extends BaseEntity<CartItemEntityProps> {
  public id: string;
  public cart: string;
  public product: string;
  public quantity: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: CartItemEntityProps) {
    super();
    this.validateProps(props, [
      "id",
      "cart",
      "quantity",
      "product",
      "createdAt",
      "updatedAt",
    ]);

    const { id, cart, quantity, product, createdAt, updatedAt } = props;

    this.id = id;
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
