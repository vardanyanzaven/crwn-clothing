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

  return [...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    const newItemQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setItemQuantity(newItemQuantity);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addItemToList(cartItems, productToAdd));
  };

  const value = { isDropdownOpen, setIsDropdownOpen, addItemToCart, cartItems, itemQuantity };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
