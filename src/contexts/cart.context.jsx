import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addItemToList = (cartItems, productToAdd) => {
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

const removeItemFromList = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
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

const clearItemFromList = (cartItems, cartItemToDelete) => {
  return cartItems.filter((item) => item.id !== cartItemToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  itemQuantity: 0,
  total: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemQuantity: 0,
  total: 0,
};

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled acton type ${type}`);
  }
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, itemQuantity, total }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartReducer = (newCartItems) => {
    const newItemQuantity = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        total: newTotal,
        itemQuantity: newItemQuantity,
      })
    );
  };

  const setIsCartOpen = (bool) =>
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
    );

  const addItemToCart = (productToAdd) => {
    const newCartItems = addItemToList(cartItems, productToAdd);
    updateCartReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeItemFromList(cartItems, cartItemToRemove);
    updateCartReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToDelete) => {
    const newCartItems = clearItemFromList(cartItems, cartItemToDelete);
    updateCartReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartItems,
    itemQuantity,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
