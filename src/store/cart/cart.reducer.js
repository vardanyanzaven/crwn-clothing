import { CART_ACTION_TYPES } from "./cart.types";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
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