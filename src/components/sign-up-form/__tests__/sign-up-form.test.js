import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import * as userActions from "../../../store/user/user.actions";
import SignUpForm from "../sign-up-form.component";
import { useDispatch } from "react-redux";

const mockInputFields = {
  displayName: "Test",
  email: "test@gmail.com",
  password: "testtest",
  confirmPassword: "testtest",
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

beforeEach(() => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
});


describe("SignUpForm tests", () => {
  const { displayName, email, password, confirmPassword } = mockInputFields;
  it("should call signUpStart after submitting with correct arguments", async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: displayName } });
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: email } });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: password } });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });

    const submitButton = screen.getByRole("button");
    const signUpStartAction = jest.spyOn(userActions, "signUpStart");

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(signUpStartAction).toHaveBeenCalledWith(
          email,
          password,
          displayName
        );
    });

    // If one of the inputs doesn't have a value, then all of them don't
    expect(passwordInput.value).toBe("");
  });

  it("should alert the error when password and confirmPassword don't match", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: displayName } });
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: email } });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: password } });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "notthesameaspassword" },
    });

    const submitButton = screen.getByRole("button");
    const signUpStartAction = jest.spyOn(userActions, "signUpStart");

    fireEvent.click(submitButton);
    expect(signUpStartAction).not.toHaveBeenCalled();
  });
});
