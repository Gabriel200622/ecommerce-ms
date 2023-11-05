import mongoose from "mongoose";
import { CartDto } from "@bigecommerce/utils";

interface CartModel extends mongoose.Model<CartDoc> {
  /**
   * Create and save a cart
   */
  build(attrs: CartDto): Promise<CartDoc>;
}

interface CartDoc extends mongoose.Document {
  id: string;
  userId: string;
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

cartSchema.statics.build = async (attrs: CartDto) => {
  const cart = new Cart(attrs);
  return await cart.save();
};

export const Cart = mongoose.model<CartDoc, CartModel>("Cart", cartSchema);
