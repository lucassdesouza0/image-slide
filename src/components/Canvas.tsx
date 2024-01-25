import React, { useRef, useEffect, useState, ReactElement } from "react";
import type { ImageData } from "../types";

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
	images: ImageData[];
}

export default function Canvas({
	images,
	...props
}: CanvasProps): ReactElement {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

	const resizeCanvas = () => {
		const parentElement = canvasRef?.current?.parentElement;

		if (!parentElement) return;

		setDimensions({
			width: parentElement?.clientWidth,
			height: parentElement?.clientHeight,
		});
	};

	const drawImage = (ctx: CanvasRenderingContext2D, imgSrc: string) => {
		const img = new Image();
		img.src = imgSrc;
		img.onload = () => {
			ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
		};
		img.onerror = () => {
			console.error(`Failed to load image at ${imgSrc}`);
		};
	};

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			if (ctx) {
				images.forEach((image) => drawImage(ctx, image.src));
			}
		}
	}, [images]);

	useEffect(() => {
		resizeCanvas();

		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			width={dimensions.width}
			height={dimensions.height}
			{...props}
		/>
	);
}
