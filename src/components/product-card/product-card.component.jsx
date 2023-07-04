import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../utils/store/cart/cart.actions";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {ProductCardContainer, Footer, Name, Price} from "./product-card.styles";
import { selectCartItems } from "../../utils/store/cart/cart.selectors";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
