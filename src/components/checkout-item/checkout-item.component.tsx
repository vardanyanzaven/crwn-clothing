import { FC, memo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.actions";

import {
  CheckoutItemContainer,
  ImgContainer,
  Arrow,
  Quantity,
  BaseSpan,
  RemoveButton,
  Value,
} from "./checkout-item.styles";
import { selectCartItems } from "../../store/cart/cart.selectors";
import { CartItemType } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  cartItem: CartItemType;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImgContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImgContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow data-testid="reduce-quantity" onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow data-testid="increase-quantity" onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton data-testid="remove-item" onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
