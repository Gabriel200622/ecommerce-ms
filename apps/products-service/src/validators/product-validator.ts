import { body } from "express-validator";
import {
  productStatusArray,
  productConditionsArray,
} from "@bigecommerce/utils";

export class ProductValidator {
  public createProductValidator() {
    return [
      body("title").notEmpty().isString().withMessage("Title is required"),
      body("slug").notEmpty().isString().withMessage("Slug is required"),
      body("description")
        .notEmpty()
        .isString()
        .withMessage("Description is required"),
      body("shortDescription")
        .notEmpty()
        .isString()
        .withMessage("Short description is required"),
      body("price")
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage(
          "Price description is required and must be greater than 0"
        ),
      body("quantity")
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage(
          "Quantity description is required and must be greater than 0"
        ),
      body("categoryId")
        .notEmpty()
        .isMongoId()
        .withMessage("CategoryId is required and must be valid"),
      body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(productStatusArray)
        .withMessage('Status must be "draft" or "published"'),
      body("condition")
        .notEmpty()
        .withMessage("Condition is required")
        .isIn(productConditionsArray)
        .withMessage('Condition must be "new", "broken" or "used"'),
    ];
  }
}
