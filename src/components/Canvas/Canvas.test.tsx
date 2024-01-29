import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Canvas from "./Canvas";

describe("Canvas", () => {
	const mockImages = [
		{ src: "path/to/image1.png", width: 640, height: 400 },
		{ src: "path/to/image2.png", width: 640, height: 348 },
	];

	it("renders without crashing", () => {
		render(
			<Canvas
				images={mockImages}
				dragOffset={0}
				onMouseUp={jest.fn()}
				isDragging={false}
			/>
		);

		expect(screen.getByTestId("canvas")).toBeInTheDocument();
	});

	it("calls onMouseUp prop when mouse up event is triggered", () => {
		const onMouseUpMock = jest.fn();
		render(
			<Canvas
				images={mockImages}
				dragOffset={0}
				onMouseUp={onMouseUpMock}
				isDragging={false}
			/>
		);
		const canvasElement = screen.getByTestId("canvas");

		fireEvent.mouseUp(canvasElement);
		expect(onMouseUpMock).toHaveBeenCalled();
	});
});
