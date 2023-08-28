import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CartDropdown from "../cart-dropdown.component";

describe("CartDropdown tests", () => {
  const mockItems = [
    { id: 1, name: "Item A", imageUrl: "testurl", price: 10, quantity: 1 },
    { id: 2, name: "Item B", imageUrl: "testurl2", price: 20, quantity: 2 },
  ];

  it("renderds empty cart text when cart is empty", () => {
    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: [],
        },
      },
    });

    const emptyCartText = screen.getByText(/your cart is empty/i);
    expect(emptyCartText).toBeInTheDocument();
  });

  it("renders cart items and not empty cart text when there are items in cart", () => {
    const mockItems = [
      {
        id: 1,
        name: "Item A",
        imageUrl: "testurl",
        price: 10,
        quantity: 1,
      },
      {
        id: 2,
        name: "Item B",
        imageUrl: "testurl2",
        price: 20,
        quantity: 2,
      },
    ];

    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: mockItems,
        },
      },
    });

    const cartItemEl = screen.getByText(/item b/i);
    expect(cartItemEl).toBeInTheDocument();

    const emptyCartText = screen.queryByText(/your cart is empty/i);
    expect(emptyCartText).toBeNull();
  });
});
