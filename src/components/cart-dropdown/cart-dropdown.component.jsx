import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";
import { selectCartItems } from "../../utils/store/cart/cart.selectors";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
      navigate("/checkout");
    };
  return (
    <CartDropdownContainer>
      <CartItems>
        {!cartItems.length ? <EmptyMessage>Your cart is empty</EmptyMessage> : cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </CartItems>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
