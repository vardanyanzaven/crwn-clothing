import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
    const {isDropdownOpen, setIsDropdownOpen, itemQuantity} = useContext(CartContext);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

  return (
    <div className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemQuantity}</span>
    </div>
  );
};

export default CartIcon;
