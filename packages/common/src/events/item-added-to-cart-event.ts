import { Subjects } from "./subjects";

export interface ItemAddedToCartEvent {
  subject: Subjects.ItemAddedToCart;
  data: {
    userId: string;
  };
}
