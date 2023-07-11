import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {...state, currentUser: null};
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Redux Toolkit
// const userSlice = createSlice({
//   // name - The name of the slice and what the actions are going to be namespaced with("name/action-name")
//   name: "user",
//   initialState: INITIAL_STATE,
//   reducers: {
//     setCurrentUser(state, { payload }) {
//       state.currentUser = payload;
//     },
//   },
// });

// export const { setCurrentUser } = userSlice.actions;

// export const userReducer = userSlice.reducer;
