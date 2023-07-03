import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {CartIconContainer, CartIconSvg, ItemCount} from"./cart-icon.styles.jsx";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, itemQuantity} = useContext(CartContext);

    const iconClickHandler = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={iconClickHandler}>
      <CartIconSvg />
      <ItemCount>{itemQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
