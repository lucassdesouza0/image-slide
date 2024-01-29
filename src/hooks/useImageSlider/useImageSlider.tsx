import { useState, useCallback, Dispatch, SetStateAction } from "react";

interface UseImageSliderProps {
	imageCount: number;
	threshold?: number;
	setDragOffset: Dispatch<SetStateAction<number>>;
}

interface UseImageSliderReturn {
	isDragging: boolean;
	dragStartX: number;
	dragDeltaX: number;
	lastX: number;
	handleMouseDown: (event: React.MouseEvent) => void;
	handleMouseMove: (event: React.MouseEvent) => void;
	handleMouseUp: () => void;
	handleMouseLeave: () => void;
	handleTouchStart: (event: React.TouchEvent) => void;
	handleTouchMove: (event: React.TouchEvent) => void;
	handleTouchEnd: () => void;
}

export const useImageSlider = ({
	imageCount,
	threshold = 0,
	setDragOffset,
}: UseImageSliderProps): UseImageSliderReturn => {
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartX, setDragStartX] = useState(0);
	const [dragDeltaX, setDragDeltaX] = useState(0);
	const [lastX, setLastX] = useState(0);

	const maxOffset = -640 * (imageCount - 1);

	const updateDragOffset = useCallback(
		(newOffset: number) => {
			const limitedOffset = Math.min(0, Math.max(maxOffset, newOffset));
			setDragOffset(limitedOffset);
		},
		[maxOffset, setDragOffset]
	);

	const handleMouseDown = useCallback((event: React.MouseEvent) => {
		setIsDragging(true);
		setDragStartX(event.clientX);
	}, []);

	const handleMouseMove = useCallback(
		(event: React.MouseEvent) => {
			if (isDragging) {
				const newDragDeltaX = event.clientX - dragStartX;
				setDragDeltaX(newDragDeltaX);
				updateDragOffset(lastX + newDragDeltaX);
			}
		},
		[isDragging, dragStartX, lastX, updateDragOffset]
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setLastX((prev) => prev + dragDeltaX);
		setDragDeltaX(0);
	}, [dragDeltaX]);

	const handleMouseLeave = useCallback(() => {
		setIsDragging(false);
		setLastX((prev) => prev + dragDeltaX);
		setDragDeltaX(0);
	}, [dragDeltaX]);

	const handleTouchStart = useCallback((event: React.TouchEvent) => {
		setIsDragging(true);
		setDragStartX(event.touches[0].clientX);
	}, []);

	const handleTouchMove = useCallback(
		(event: React.TouchEvent) => {
			if (isDragging) {
				const newDragDeltaX = event.touches[0].clientX - dragStartX;
				setDragDeltaX(newDragDeltaX);
				updateDragOffset(lastX + newDragDeltaX);
			}
		},
		[isDragging, dragStartX, lastX, updateDragOffset]
	);

	const handleTouchEnd = useCallback(() => {
		setIsDragging(false);
		setLastX((prev) => prev + dragDeltaX);
		setDragDeltaX(0);
	}, [dragDeltaX]);

	return {
		isDragging,
		dragStartX,
		dragDeltaX,
		lastX,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
	};
};
