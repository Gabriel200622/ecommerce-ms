import mongoose from "mongoose";
import { generateUsername } from "../../../utils";
import { UserDto } from "@bigecommerce/utils";

interface UserModel extends mongoose.Model<UserDoc> {
  /**
   * Create and save a user
   */
  build(attrs: UserDto): Promise<UserDoc>;
}

interface UserDoc extends mongoose.Document {
  id: string;
  name: string;
  username: string;
  email: string;
  userImageId: string | null;
  userImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).",
      ],
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      maxLength: [
        100,
        "The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).",
      ],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    userImageUrl: { type: String },
    userImageId: { type: String },
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

userSchema.pre("save", function (next) {
  if (this.username) {
    return next();
  }

  this.username = generateUsername(this.email);

  next();
});

userSchema.statics.build = async (attrs: UserDto) => {
  const user = new User(attrs);
  return await user.save();
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
