import { CategoryItem } from "../categories/categories.types";
import { createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItemType } from "./cart.types";
import { ActionWithPayload } from "../../utils/reducer/reducer.utils";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItemType[]
>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItemType[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

const addItemToList = (
  cartItems: CartItemType[],
  productToAdd: CategoryItem
): CartItemType[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemFromList = (cartItems: CartItemType[], cartItemToRemove: CartItemType): CartItemType[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItemToRemove.quantity > 1
    ? cartItems.map((item) =>
        item.id === cartItemToRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    : cartItems;
};

const clearItemFromList = (
  cartItems: CartItemType[],
  cartItemToClear: CartItemType
): CartItemType[] => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const addItemToCart = (
  cartItems: CartItemType[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addItemToList(cartItems, productToAdd);
  return setCartItems(newCartItems)
};

export const removeItemFromCart = (
  cartItems: CartItemType[],
  cartItemToRemove: CartItemType
) => {
  const newCartItems = removeItemFromList(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItemType[],
  cartItemToClear: CartItemType
) => {
  const newCartItems = clearItemFromList(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
