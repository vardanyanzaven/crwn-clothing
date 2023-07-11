import { useDispatch, useSelector } from "react-redux";

import {CartIconContainer, CartIconSvg, ItemCount} from"./cart-icon.styles.jsx";
import { selectIsCartOpen, selectItemQuantity } from "../../store/cart/cart.selectors";
import { setIsCartOpen } from "../../store/cart/cart.actions"

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
