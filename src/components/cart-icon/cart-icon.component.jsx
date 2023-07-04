import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {CartIconContainer, CartIconSvg, ItemCount} from"./cart-icon.styles.jsx";
import { selectIsCartOpen, selectItemQuantity } from "../../utils/store/cart/cart.selectors";
import { setIsCartOpen } from "../../utils/store/cart/cart.actions";

const CartIcon = () => {
  const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const itemQuantity = useSelector(selectItemQuantity);


    const iconClickHandler = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={iconClickHandler}>
      <CartIconSvg />
      <ItemCount>{itemQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
