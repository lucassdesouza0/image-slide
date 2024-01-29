import React from "react";
import { render, screen } from "@testing-library/react";
import ImageSlider from "../ImageSlider/ImageSlider";

describe("ImageSlider", () => {
	it("renders without crashing", () => {
		const { container } = render(<ImageSlider />);
		expect(container).toBeInTheDocument();
	});

	it("renders the canvas component", () => {
		render(<ImageSlider />);
		const canvasComponent = screen.getByTestId("image-slider-container");
		expect(canvasComponent).toBeInTheDocument();
	});
});
