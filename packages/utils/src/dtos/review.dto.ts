import { ReviewDtoProps } from "../interfaces";
import { BaseDto } from "./base.dto";

export class ReviewDto extends BaseDto<ReviewDtoProps> {
  userId: string;
  productId: string;
  content: string;
  rating: number;

  constructor(props: ReviewDtoProps) {
    super();
    const { userId, productId, content, rating } = this.validateProps(
      props,
      ["userId", "productId", "content", "rating"],
      (options) => {
        if (options.rating > 5 || options.rating < 1) {
          throw new Error(`'RATING' is required and must be valid.`);
        }
      }
    );

    this.userId = userId;
    this.productId = productId;
    this.content = content;
    this.rating = rating;
  }
}
