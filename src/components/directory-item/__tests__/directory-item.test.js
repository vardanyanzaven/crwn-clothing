import { fireEvent, render, screen } from "@testing-library/react";

import DirectoryItem from "../directory-item.component";
import { MemoryRouter } from "react-router-dom";

describe("DirectoryItem tests", () => {
    const mockDirItemOpts = {
        imageUrl: "testurl",
        title: "Mens",
        route: "mens"
    }
    it("should redirect to category page on DirectoryItem click", () => {
        const {container} = render(<MemoryRouter><DirectoryItem category={mockDirItemOpts} /></MemoryRouter>);

        fireEvent.click(container);
        
        const catTitleEl = screen.getByText(/mens/i);
        expect(catTitleEl).toBeInTheDocument();
    })
});