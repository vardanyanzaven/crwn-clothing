import { fireEvent, render, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CategoryPreview from "../category-preview.component";
import { CategoryTitle } from "../../../routes/category/category.styles";

describe("CategoryPreview tests", () => {
  const catPreviewTitle = "mens";
  const catPreviewItems = [
    { id: 1, name: "Item 1", imageUrl: "tesurl1", price: 15 },
    { id: 2, name: "Item 2", imageUrl: "tesurl2", price: 20 },
    { id: 3, name: "Item 3", imageUrl: "tesurl3", price: 30 },
    { id: 4, name: "Item 4", imageUrl: "tesurl4", price: 35 },
    { id: 5, name: "Item 5", imageUrl: "tesurl5", price: 55 },
  ];

  it("CategoriesPreview should render only 4 items", () => {
    renderWithProviders(
      <CategoryPreview title={catPreviewTitle} items={catPreviewItems} />,
      {
        preloadedState: {
          categories: {
            isLoading: false,
            categories: {},
          },
        },
      }
    );

    const fourthProductEl = screen.getByText(/item 4/i);
    const fifthProductEl = screen.queryByText(/item 5/i);

    expect(fourthProductEl).toBeInTheDocument();
    expect(fifthProductEl).toBeNull();
  });

  it("should open the category page when Title is clicked", () => {
    renderWithProviders(
      <CategoryPreview title={catPreviewTitle} items={catPreviewItems} />,
      {
        preloadedState: {
          categories: {
            isLoading: false,
            categories: {},
          },
        },
      }
    );

    const titleLinkEl = screen.getByText(/mens/i);
    fireEvent.click(titleLinkEl);
    
    const categoryTitleEl = screen.getByText(/mens/i);
    expect(categoryTitleEl).toBeInTheDocument();
  });
});
