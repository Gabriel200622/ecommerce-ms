import {
  CartDto,
  CartEntity,
  CartItemDto,
  CartItemEntity,
} from "@bigecommerce/utils";
import { CartDataSource } from "./types";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/CartItem";

export class MongoCartDataSource implements CartDataSource {
  async create(cartDto: CartDto): Promise<CartEntity | undefined> {
    const cart = await Cart.build(cartDto);

    const newCart = new CartEntity({ ...cart });

    return newCart;
  }

  async getMyCart(userId: string): Promise<CartEntity | undefined> {
    const cartMongo = await Cart.findOne({ userId });
    if (!cartMongo) return undefined;

    const cartItemsMongo = await CartItem.find({ cart: cartMongo.id });
    const cartItems = cartItemsMongo.map(
      (item) => new CartItemEntity({ ...item })
    );

    const cart = new CartEntity({ ...cartMongo, items: cartItems });

    return cart;
  }

  async addItemToCart(
    cartItemDto: CartItemDto,
    userId: string
  ): Promise<CartItemEntity | undefined> {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const cartItem = await CartItem.build(cartItemDto);
      const newCartItem = new CartItemEntity({ ...cartItem });
      return newCartItem;
    } else {
      const cartDto = new CartDto({ userId });
      await Cart.build(cartDto);
      const cartItem = await CartItem.build(cartItemDto);
      const newCartItem = new CartItemEntity({ ...cartItem });
      return newCartItem;
    }
  }

  async removeItemFromCart(
    cartItemId: string,
    userId: string
  ): Promise<string | undefined> {
    const cart = await Cart.findOne({ userId });

    if (!cart) return undefined;

    await CartItem.deleteOne({ id: cartItemId, cart: cart.id });

    return "Item deleted successfully";
  }
}
