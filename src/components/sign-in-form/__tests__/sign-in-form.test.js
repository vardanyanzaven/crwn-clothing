import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as userActions from "../../../store/user/user.actions";
import SignInForm from "../sign-in-form.component";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

beforeEach(() => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
})

describe("SignInForm tests", () => {
  it("should dispatch signInStart on Sign in button click", async () => {
    const mockEmail = "test@gmail.com";
    const mockPassword = "test1234";

    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    const emailInputEl = screen.getByTestId("email-input");
    fireEvent.change(emailInputEl, { target: { value: mockEmail } });

    const passwordInputEl = screen.getByTestId("password-input");
    fireEvent.change(passwordInputEl, { target: { value: mockPassword } });

    const signInBtnEl = screen.getByTestId("sign-in");
    const signInAction = jest.spyOn(userActions, "emailSignInStart");

    fireEvent.click(signInBtnEl);

    await waitFor(() => expect(signInAction).toHaveBeenCalledWith(mockEmail, mockPassword));

    expect(passwordInputEl.value).toBe("");

  });

  it("should dispatch googleSignInStart on Google Sign In button click", () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    const googleSignInBtnEl = screen.getByTestId("google-sign-in");
    const googleSignInAction = jest.spyOn(userActions, "googleSignInStart");

    fireEvent.click(googleSignInBtnEl);

    expect(googleSignInAction).toHaveBeenCalled();
  });
});
