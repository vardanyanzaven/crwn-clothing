import { screen } from "@testing-library/react";

import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        category: "mens",
    })
}))

describe("Category tests", () => {
    it("should render Spinner if isLoading is true", () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        });

        const spinnerEl = screen.getByTestId("spinner");
        expect(spinnerEl).toBeInTheDocument();
    });

        it("should render products if isLoading is false and items are present", () => {
          renderWithProviders(<Category />, {
            preloadedState: {
              categories: {
                isLoading: false,
                categories: [
                  {
                    title: "mens",
                    items: [
                      { id: 1, name: "Product 1" },
                      { id: 2, name: "Product 2" },
                    ],
                  },
                ],
              },
            },
          });

          
          const product1El = screen.getByText(/product 1/i);
          expect(product1El).toBeInTheDocument();
          
          // Testing that Spinner isn't rendered
          const spinnerEl = screen.queryByTestId("spinner");
          expect(spinnerEl).toBeNull();
        });
});