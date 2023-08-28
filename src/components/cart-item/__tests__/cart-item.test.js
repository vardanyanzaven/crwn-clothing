import { render, screen } from "@testing-library/react";

import CartItem from "../cart-item.component";

describe("CartItem tests", () => {
    const mockItemInfo = {
        name: "Test product",
        imageUrl: "teturl",
        price: 15,
        quantity: 2
    }
    it("renders CartItems properly", () => {
        render(<CartItem cartItem={mockItemInfo}/>);

        const imageEl = screen.getByAltText(/test product/i);
        expect(imageEl).toBeInTheDocument();

        const itemNameEl = screen.getByText(/test product/i);
        expect(itemNameEl).toBeInTheDocument();

        const itemQuantityEl = screen.getByText("2 x $15");
        expect(itemQuantityEl).toBeInTheDocument();
    })
})