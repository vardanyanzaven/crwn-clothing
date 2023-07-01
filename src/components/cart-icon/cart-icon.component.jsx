import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {CartIconContainer, CartIconSvg, ItemCount} from"./cart-icon.styles.jsx";

const CartIcon = () => {
    const {isDropdownOpen, setIsDropdownOpen, itemQuantity} = useContext(CartContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

  return (
    <CartIconContainer onClick={toggleDropdown}>
      <CartIconSvg />
      <ItemCount>{itemQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
