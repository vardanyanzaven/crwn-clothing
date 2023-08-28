import { call } from "typed-redux-saga/macro";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";

import {
  fetchCategoriesAsync,
  onFetchCategories,
  categoriesSaga,
} from "../categories.saga";
import { CATEGORIES_ACTION_TYPES } from "../categories.types";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "../categories.actions";

describe("Categories sagas tests", () => {
  it("tests categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  it("tests onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  it("tests fetchCategoriesAsync success", () => {
    const mockCategoriesArr = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArr]])
      .put(fetchCategoriesSuccess(mockCategoriesArr))
      .run();
  });

  it("tests fetchCategoriesAsync failure", () => {
    const mockError = new Error("Unknown error!");
    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
      .put(fetchCategoriesFailed(mockError))
      .run();
  });
});
