import mongoose from "mongoose";
import { CategoryDto } from "@bigecommerce/utils";

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  /**
   * Create and save a category
   */
  build(attrs: CategoryDto): Promise<CategoryDoc>;
}

interface CategoryDoc extends mongoose.Document {
  id?: string;
  name: string;
  slug: string;
  description?: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
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

categorySchema.statics.build = async (attrs: CategoryDto) => {
  const category = new Category(attrs);
  return await category.save();
};

export const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);
