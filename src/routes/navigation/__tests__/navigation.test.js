import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";
import * as userActions from "../../../store/user/user.actions";

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Navigation tests", () => {
  const useDispatchMock = reactRedux.useDispatch;
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
  });
  afterEach(() => {
    useDispatchMock.mockClear();
  });

  it("should show Sign In link and not Sign Out link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signInLinkEl = screen.getByText(/sign in/i);
    expect(signInLinkEl).toBeInTheDocument();

    const signOutLinkEl = screen.queryByText(/sign out/i);
    expect(signOutLinkEl).toBeNull();
  });

  it("should render Sign Out and not Sign In if there is currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signOutLinkEl = screen.getByText(/sign out/i);
    expect(signOutLinkEl).toBeInTheDocument();

    const signInLinkEl = screen.queryByText(/sign in/i);
    expect(signInLinkEl).toBeNull();
  });

  it("should not render CartDropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    const ButtonEl = screen.queryByText(/go to checkout/i);
    expect(ButtonEl).toBeNull();
  });

  it("should render CartDropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    const ButtonEl = screen.getByText(/go to checkout/i);
    expect(ButtonEl).toBeInTheDocument();
  });

  it("should dispatch Sign Out action when clicking Sign Out link", async () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: [],
        },
      },
    });

    // jest.spyOn(reactRedux, "useDispatch");
    const signOutStartAction = jest.spyOn(userActions, "signOutStart");

    const signOutLinkEl = screen.getByText(/sign out/i);
    expect(signOutLinkEl).toBeInTheDocument();

    fireEvent.click(signOutLinkEl);
    expect(useDispatchMock).toHaveBeenCalled();
    expect(signOutStartAction).toHaveBeenCalled();
  });
});
