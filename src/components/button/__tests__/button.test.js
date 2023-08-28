import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
  it("should render base button when nothing is passed", () => {
    render(<Button>Test</Button>);
    // const buttonElement = screen.getByText(/test/i);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.dataset.testid).toStrictEqual("button-base");
  });

  it("should render inverted button when inverted type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);
    // const buttonElement = screen.getByText(/test/i);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.dataset.testid).toStrictEqual("button-inverted");
  });

  it("should render google sign in button when sign in type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);
    // const buttonElement = screen.getByText(/test/i);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.dataset.testid).toStrictEqual("button-google-sign-in");
  });

  it("should render loading button when isLoading is set to true", () => {
    render(<Button isLoading={true}>Test</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  })
});
