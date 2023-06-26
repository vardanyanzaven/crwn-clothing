import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider = ({children}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const value = {isDropdownOpen, setIsDropdownOpen};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};