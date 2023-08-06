import { FC, memo } from "react";

import { CartItemType } from "../../store/cart/cart.types";
import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.styles";

type CartItemProps = {
  cartItem: CartItemType;
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
