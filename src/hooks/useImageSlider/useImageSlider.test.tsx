import { renderHook, act } from "@testing-library/react";
import { useImageSlider } from "./useImageSlider";

describe("useImageSlider", () => {
	it("should initialize with correct default states", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);

		expect(result.current.isDragging).toBe(false);
		expect(result.current.dragStartX).toBe(0);
		expect(result.current.dragDeltaX).toBe(0);
		expect(result.current.lastX).toBe(0);
	});

	it("should handle mouse down event", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);
		act(() => {
			result.current.handleMouseDown({ clientX: 100 } as any);
		});

		expect(result.current.isDragging).toBe(true);
		expect(result.current.dragStartX).toBe(100);
	});

	it("should handle mouse move event and update states while dragging", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);

		act(() => {
			result.current.handleMouseDown({ clientX: 150 } as any);
		});
		expect(result.current.isDragging).toBe(true);
		act(() => {
			result.current.handleMouseMove({ clientX: 200 } as any);
		});

		expect(result.current.dragDeltaX).toBe(50);
		expect(mockSetDragOffset).toHaveBeenCalled();
	});

	it("should handle mouse up event and stop dragging", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);

		act(() => {
			result.current.handleMouseDown({ clientX: 150 } as any);
		});
		expect(result.current.isDragging).toBe(true);

		act(() => {
			result.current.handleMouseMove({ clientX: 200 } as any);
		});

		expect(result.current.isDragging).toBe(true);
		expect(result.current.dragDeltaX).toBe(50);
	});

	it("should handle mouse leave event and stop dragging", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);

		act(() => {
			result.current.handleMouseDown({ clientX: 150 } as any);
		});
		expect(result.current.isDragging).toBe(true);

		act(() => {
			result.current.handleMouseMove({ clientX: 200 } as any);
		});
		expect(result.current.dragDeltaX).toBe(50);

		act(() => {
			result.current.handleMouseLeave();
		});

		expect(result.current.isDragging).toBe(false);
	});

	it("should handle touch start event", () => {
		const mockSetDragOffset = jest.fn();
		const { result } = renderHook(() =>
			useImageSlider({ imageCount: 5, setDragOffset: mockSetDragOffset })
		);

		act(() => {
			result.current.handleTouchStart({ touches: [{ clientX: 100 }] } as any);
		});

		expect(result.current.isDragging).toBe(true);
		expect(result.current.dragStartX).toBe(100);
	});
});
