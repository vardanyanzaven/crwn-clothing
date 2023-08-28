import {
  selectCategories,
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../categories.selectors";

const mockCategoriesSlice = {
  categories: {
    isLoading: false,
    categories: [
      {
        title: "mens",
        imageUrl: "testurl1",
        items: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" },
        ],
      },
      {
        title: "womens",
        imageUrl: "testurl2",
        items: [
          { id: 3, name: "Product 3" },
          { id: 4, name: "Product 4" },
        ],
      },
    ],
  },
};

describe("Categoris selector tests", () => {
  it("should return categories data when selectCategories is called", () => {
    expect(selectCategories(mockCategoriesSlice)).toStrictEqual(
      mockCategoriesSlice.categories.categories
    );
  });

  it("should return an object with category items when selectCategoriesMap is called", () => {
    expect(selectCategoriesMap(mockCategoriesSlice)).toStrictEqual({
      mens: mockCategoriesSlice.categories.categories[0].items,
      womens: mockCategoriesSlice.categories.categories[1].items,
    });
  });

  it("should return isLoading when selectIsCategoriesLoading is called", () => {
    expect(selectIsCategoriesLoading(mockCategoriesSlice)).toStrictEqual(false);
  });
});
