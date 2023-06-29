import { createContext, useEffect, useState } from "react";

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
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1) {return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )};

  return cartItemToRemove.quantity > 1
    ? cartItems.map((item) =>
        item.id === cartItemToRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    : cartItems;
};

const clearItemFromList = (cartItems, cartItemToDelete) => {
  return cartItems.filter(item => item.id !== cartItemToDelete.id);
}

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

export const CartProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newItemQuantity = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setItemQuantity(newItemQuantity);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addItemToList(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeItemFromList(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToDelete) =>
    setCartItems(clearItemFromList(cartItems, cartItemToDelete));

  const value = {
    isDropdownOpen,
    setIsDropdownOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartItems,
    itemQuantity,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
