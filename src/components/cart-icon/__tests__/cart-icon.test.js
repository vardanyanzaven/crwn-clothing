import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon tests", () => {
  it("uses preloded state to render", () => {
    const initialCartItems = [
      { id: 1, name: "Item A", imageUrl: "testurl", price: 10, quantity: 1 },
      { id: 2, name: "Item B", imageUrl: "testurl2", price: 20, quantity: 2 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    const cartIconElement = screen.getByText("3");
    expect(cartIconElement).toBeInTheDocument();
  });
});
