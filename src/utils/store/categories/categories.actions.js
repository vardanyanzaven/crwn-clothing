import { createAction } from "../../reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategories = (categoriesArr) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArr);