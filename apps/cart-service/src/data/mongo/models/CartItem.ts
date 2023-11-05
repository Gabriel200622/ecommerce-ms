import mongoose from "mongoose";
import { CartItemDto } from "@bigecommerce/utils";

interface CartItemModel extends mongoose.Model<CartItemDoc> {
  /**
   * Create and save a cart
   */
  build(attrs: CartItemDto): Promise<CartItemDoc>;
}

interface CartItemDoc extends mongoose.Document {
  id: string;
  cart: string;
  product: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

cartItemSchema.statics.build = async (attrs: CartItemDto) => {
  const cartItem = new CartItem(attrs);
  return await cartItem.save();
};

export const CartItem = mongoose.model<CartItemDoc, CartItemModel>(
  "CartItem",
  cartItemSchema
);
