import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.actions";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (
    setCartItems.match(action)
  ) {
    return {
        ...state,
        cartItems: action.payload,
    };
  }
  if(setIsCartOpen.match(action)) {
    return {
        ...state,
        isCartOpen: action.payload,
    }
  }

  return state;
};

/// Redux Toolkit(addCartItem, removeCartItem and clearCartItem need to be moved here)
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: CART_INITIAL_STATE,
//   reducers: {
//     setIsCartOpen(state, { payload }) {
//       state.isCartOpen = payload;
//     },
//     addItemToCart(state, { payload }) {
//       state.cartItems = addCartItem(state.cartItems, payload);
//     },
//     removeItemFromCart(state, { payload }) {
//       state.cartItems = removeCartItem(state.cartItems, payload);
//     },
//     clearItemFromCart(state, { payload }) {
//       state.cartItems = clearCartItem(state.cartItems, payload);
//     },
//   },
// });

// export const {
//   setIsCartOpen,
//   addItemToCart,
//   removeItemFromCart,
//   clearItemFromCart,
// } = cartSlice.actions;

// export const cartReducer = cartSlice.reducer;