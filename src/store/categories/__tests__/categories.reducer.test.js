import {
  categoriesReducer,
  CATEGORIES_INITIAL_STATE,
} from "../categories.reducer";

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../categories.actions";

describe("Categories reducer tests", () => {
  it("tests fetchCategoriesStart", () => {
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };

    expect(
      categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
    ).toStrictEqual(expectedState);
  });

  it("tests fetchCategoriesSuccess", () => {
    const mockData = [
      {
        title: "mens",
        imageUrl: "testurl1",
        items: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }],
      },
      {
        title: "womens",
        imageUrl: "testurl2",
        items: [{ id: 3, name: "Product 3" }, { id: 4, name: "Product 4" }],
      },
    ];

    const expectedState = {
        ...CATEGORIES_INITIAL_STATE,
        isLoading: false,
        categories: mockData
    }

    expect(
      categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))
    ).toStrictEqual(expectedState);
  });

  it("tests fetchCategoriesFailed", () => {
    const mockError = new Error("Error fetching categories!");
    const expectedState = {
        ...CATEGORIES_INITIAL_STATE,
        error: mockError,
    };

    expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toStrictEqual(expectedState);
  });
});
