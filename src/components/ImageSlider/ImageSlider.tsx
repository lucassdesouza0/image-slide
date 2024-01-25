import React, { useState, useEffect, ReactElement } from "react";
import type { ImageData } from "../../types";
import Canvas from "../Canvas";

import "./ImageSlider.css";

export default function ImageSlider(): ReactElement {
	const [images, setImages] = useState<ImageData[]>([]);

	useEffect(() => {
		const loadedImages: ImageData[] = [
			{ src: "/images/cat-1.png", title: "cat 1" },
			{ src: "/images/cat-2.png", title: "cat 2" },
			{ src: "/images/cat-3.png", title: "cat 3" },
			{ src: "/images/cat-4.png", title: "cat 4" },
		];

		setImages(loadedImages);
	}, []);

	useEffect(() => {
		const preloadImages = async () => {
			const promises = images.map((image) => {
				return new Promise<void>((resolve, reject) => {
					const img = new Image();
					img.src = image.src;
					img.onload = () => resolve();
					img.onerror = () =>
						reject(new Error(`Failed to load image at ${image.src}`));
				});
			});

			try {
				await Promise.all(promises);
				console.log("All images preloaded");
			} catch (error) {
				console.error("Error preloading images", error);
			}
		};

		if (images.length > 0) {
			preloadImages();
		}
	}, [images]);

	return (
		<div className="image-slider-container">
			<Canvas className="image-slider-canvas" images={images} />

			<div className="slider-controls">
				<button className="prev-button">Previous</button>
				<button className="next-button">Next</button>
			</div>

			<div className="image-indicators"></div>
		</div>
	);
}
