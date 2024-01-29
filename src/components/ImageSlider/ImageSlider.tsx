import React, { useState, useEffect, ReactElement } from "react";
import type { ImageData } from "../../types";
import { useImageSlider } from "../../hooks/useImageSlider/useImageSlider";
import Canvas from "../Canvas/Canvas";

import "./ImageSlider.css";

const images: ImageData[] = [
	{ src: "/images/cat-1.png", title: "cat 1", width: 640, height: 400 },
	{ src: "/images/cat-2.png", title: "cat 2", width: 640, height: 348 },
	{ src: "/images/cat-3.png", title: "cat 3", width: 500, height: 398 },
	{ src: "/images/cat-4.png", title: "cat 4", width: 200, height: 399 },
];

export default function ImageSlider(): ReactElement {
	const [dragOffset, setDragOffset] = useState<number>(0);
	const {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		isDragging,
	} = useImageSlider({
		imageCount: images.length,
		setDragOffset: setDragOffset,
	});

	useEffect(() => {
		Promise.all(
			images.map((image) => {
				return new Promise<void>((resolve, reject) => {
					const img = new Image();
					img.src = image.src;
					img.onload = () => resolve();
					img.onerror = () =>
						reject(new Error(`Failed to load image at ${image.src}`));
				});
			})
		);
	}, []);

	if (!images.length) return <></>;

	return (
		<div className="container" data-testid="image-slider-container">
			<Canvas
				className="canvas"
				images={images}
				isDragging={isDragging}
				dragOffset={dragOffset}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			/>
		</div>
	);
}
