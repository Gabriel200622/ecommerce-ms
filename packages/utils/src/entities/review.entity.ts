import { ReviewEntityProps } from "../interfaces";
import { BaseEntity } from "./base.entity";

export class ReviewEntity extends BaseEntity<ReviewEntityProps> {
  public id: string;
  public userId: string;
  public productId: string;
  public content: string;
  public rating: number;

  constructor(props: ReviewEntityProps) {
    super();
    this.validateProps(props, [
      "id",
      "userId",
      "productId",
      "content",
      "rating",
    ]);

    const { id, userId, productId, content, rating } = props;

    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.content = content;
    this.rating = rating;
  }
}
