import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: 
      return {...state, categories: payload}
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
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
// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: CATEGORIES_INITIAL_STATE,
//   reducers: {
//     setCategories(state, { payload }) {
//       state.categories = payload;
//     },
//   },
// });

// export const { setCategories } = categoriesSlice.actions;

// export const categoriesReducer = categoriesSlice.reducer;