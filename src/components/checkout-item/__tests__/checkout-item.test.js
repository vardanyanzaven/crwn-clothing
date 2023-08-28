import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CheckoutItem from "../checkout-item.component";

describe("CheckoutItem tests", () => {
  const mockCartItems = [
    {
      id: 1,
      name: "Item 1",
      price: 10,
      imageUrl: "asdasd",
      quantity: 3,
    },
    {
      id: 2,
      name: "Item 2",
      price: 30,
      imageUrl: "dsadsa",
      quantity: 5,
    },
  ];
  
  it("checks if quantity is reduced on left arrow click", () => {
    const { store } = renderWithProviders(
      <CheckoutItem cartItem={mockCartItems[0]} />,
      {
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      }
    );

    const reduceButtonEl = screen.getByTestId("reduce-quantity");

    fireEvent.click(reduceButtonEl);
    expect(store.getState().cart.cartItems[0].quantity).toStrictEqual(2);
  });

  it("checks if quantity is incresed on right arrow click", () => {
    const { store } = renderWithProviders(
      <CheckoutItem cartItem={mockCartItems[0]} />,
      {
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      }
    );

    const increaseButtonEl = screen.getByTestId("increase-quantity");

    fireEvent.click(increaseButtonEl);
    expect(store.getState().cart.cartItems[0].quantity).toStrictEqual(4);
  });

  it("checks if item is removed on RemoveButton click", () => {
    const { store } = renderWithProviders(
      <CheckoutItem cartItem={mockCartItems[1]} />,
      {
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      }
    );

    const removeItemButtonEl = screen.getByTestId("remove-item");

    fireEvent.click(removeItemButtonEl);
    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
