import type { Request, Response } from "express";
import { handleCatchError, responseHandler } from "@bigecommerce/common";
import { CartRepository } from "../../domain/interfaces";
import { AddItemToCart } from "../../domain/use-cases/cart/add-item-to-cart";
import { RemoveItemFromCart } from "../../domain/use-cases/cart/remove-item-from-cart";
import { GetMyCart } from "../../domain/use-cases/cart/get-my-cart";
import { CartItemDto } from "@bigecommerce/utils";

export class CartController {
  constructor(private readonly cartRepository: CartRepository) {}

  public getMyCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return responseHandler({
          status: 500,
          msg: "Something went wrong",
          res: res,
        });
      }

      const cart = await new GetMyCart(this.cartRepository).execute(
        req.user.id
      );

      if (!cart)
        return responseHandler({ res, status: 404, msg: "Cart not found" });

      return responseHandler({
        res,
        data: cart,
        status: 200,
      });
    } catch (error) {
      handleCatchError({ error, res });
    }
  };

  public addItemToCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return responseHandler({
          status: 500,
          msg: "Something went wrong",
          res: res,
        });
      }

      const cartItemDto = new CartItemDto(req.body);

      const item = await new AddItemToCart(this.cartRepository).execute(
        cartItemDto,
        req.user.id
      );

      return responseHandler({
        res: res,
        status: 201,
        data: item,
      });
    } catch (error) {
      handleCatchError({ error, res });
    }
  };

  public removeItemFromCart = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return responseHandler({
          status: 500,
          msg: "Something went wrong",
          res: res,
        });
      }

      const { cartItemId } = req.params;

      const msg = await new RemoveItemFromCart(this.cartRepository).execute(
        cartItemId,
        req.user.id
      );

      return responseHandler({
        msg: msg,
        res: res,
        status: 200,
      });
    } catch (error) {
      handleCatchError({ error, res });
    }
  };
}
