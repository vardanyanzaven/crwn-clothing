import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.component";

describe("Product card tests", () => {
  it("should add product item when Product Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "testurl",
      name: "Item A",
      price: 10,
    };
    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    );

    const addToCartBtnEl = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartBtnEl);

    expect(store.getState().cart.cartItems).toHaveLength(1);
  });
});
