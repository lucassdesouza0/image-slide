import React, { useRef, ReactElement, useEffect } from "react";
import type { ImageData } from "../../types";

const CANVA_WIDTH = 640;
const CANVA_HEIGHT = 400;

interface CanvasProps
	extends Omit<React.CanvasHTMLAttributes<HTMLCanvasElement>, "onMouseUp"> {
	images: ImageData[];
	dragOffset: number;
	isDragging: boolean;
	onMouseUp: (imageWidth: number) => void;
}

export default function Canvas({
	images,
	dragOffset,
	isDragging,
	onMouseUp,
	...props
}: CanvasProps): ReactElement {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	function drawImage(
		ctx: CanvasRenderingContext2D,
		image: any,
		offset: number
	) {
		const scaledWidth = Math.min(CANVA_WIDTH, image?.width!);
		const scaledHeight = Math.min(CANVA_HEIGHT, image?.height!);

		const centerX = (CANVA_WIDTH - scaledWidth) / 2;
		const centerY = (CANVA_HEIGHT - scaledHeight) / 2;

		ctx.fillStyle = "#F2F2F2";
		ctx.fillRect(centerX + offset, centerY, scaledWidth, scaledHeight);
		ctx.drawImage(image, centerX + offset, centerY, scaledWidth, scaledHeight);
	}

	useEffect(() => {
		if (canvasRef.current && images.length > 0) {
			const ctx = canvasRef.current.getContext("2d");
			ctx?.clearRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
			if (ctx) {
				images.forEach((image, index) => {
					const img = new Image();
					img.src = image.src;
					img.width = image.width!;
					img.height = image.height!;

					img.onload = () => {
						drawImage(ctx, img, dragOffset + index * CANVA_WIDTH);
					};
					if (img.complete) {
						drawImage(ctx, img, dragOffset + index * CANVA_WIDTH);
					}
				});
			}
		}
	}, [images, dragOffset]);

	return (
		<canvas
			ref={canvasRef}
			width={CANVA_WIDTH}
			height={CANVA_HEIGHT}
			onMouseUp={() => onMouseUp(CANVA_WIDTH ?? 0)}
			data-testid="canvas"
			{...props}
		/>
	);
}
