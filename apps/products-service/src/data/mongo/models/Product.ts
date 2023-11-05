import mongoose from "mongoose";
import {
  ProductCondition,
  ProductDto,
  ProductStatus,
  EcommerceFile,
  productStatusArray,
  productConditionsArray,
} from "@bigecommerce/utils";

interface ProductModel extends mongoose.Model<ProductDoc> {
  /**
   * Create and save a product
   */
  build(attrs: ProductDto): Promise<ProductDoc>;
}

interface ProductDoc extends mongoose.Document {
  id: string;
  author: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  quantity: number;
  keywords: string[];
  category?: string;
  status: ProductStatus;
  condition: ProductCondition;
  images: EcommerceFile[];
  videos: EcommerceFile[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: [
        600,
        "The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).",
      ],
    },
    shortDescription: {
      type: String,
      trim: true,
      required: true,
      maxLength: [
        150,
        "The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
    },
    quantity: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
    },
    keywords: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: productStatusArray,
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },
    },
    condition: {
      type: String,
      required: true,
      enum: {
        values: productConditionsArray,
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },
    },
    images: [
      {
        publicId: String,
        secureUrl: String,
      },
    ],
    videos: [
      {
        publicId: String,
        secureUrl: String,
      },
    ],
    // Analytics
    views: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
      default: 0,
    },
    clicks: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
      default: 0,
    },
    purchases: {
      type: Number,
      required: true,
      min: [
        0,
        "The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).",
      ],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.views;
        delete ret.clicks;
        delete ret.purchases;
      },
    },
    toObject: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.views;
        delete ret.clicks;
        delete ret.purchases;
      },
    },
  }
);

productSchema.statics.build = async (attrs: ProductDto) => {
  const product = new Product(attrs);
  return await product.save();
};

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);
