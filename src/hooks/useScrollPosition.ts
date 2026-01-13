import { useEffect, useState } from "react";

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollDirection {
  vertical: "up" | "down" | null;
  horizontal: "left" | "right" | null;
}

export interface UseScrollPositionOptions {
  /** Throttle delay in milliseconds */
  throttle?: number;
  /** Element to track scroll position (defaults to window) */
  element?: HTMLElement | null;
}

/**
 * Custom hook to track scroll position
 * @param options - Configuration options
 * @returns Current scroll position
 * 
 * @example
 * const { x, y } = useScrollPosition();
 * const position = useScrollPosition({ throttle: 100 });
 */
export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { throttle = 100, element = null } = options;
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = element || window;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollX = element ? element.scrollLeft : window.scrollX;
        const scrollY = element ? element.scrollTop : window.scrollY;

        setPosition({ x: scrollX, y: scrollY });
        timeoutId = null;
      }, throttle);
    };

    // Set initial position
    const initialScrollX = element ? element.scrollLeft : window.scrollX;
    const initialScrollY = element ? element.scrollTop : window.scrollY;
    setPosition({ x: initialScrollX, y: initialScrollY });

    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [throttle, element]);

  return position;
}

/**
 * Hook to track scroll direction
 * @param options - Configuration options
 * @returns Current scroll direction
 * 
 * @example
 * const { vertical, horizontal } = useScrollDirection();
 */
export function useScrollDirection(
  options: UseScrollPositionOptions = {}
): ScrollDirection {
  const { throttle = 100, element = null } = options;
  const [direction, setDirection] = useState<ScrollDirection>({
    vertical: null,
    horizontal: null,
  });
  const [prevPosition, setPrevPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = element || window;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollX = element ? element.scrollLeft : window.scrollX;
        const scrollY = element ? element.scrollTop : window.scrollY;

        const newDirection: ScrollDirection = {
          vertical:
            scrollY > prevPosition.y
              ? "down"
              : scrollY < prevPosition.y
              ? "up"
              : direction.vertical,
          horizontal:
            scrollX > prevPosition.x
              ? "right"
              : scrollX < prevPosition.x
              ? "left"
              : direction.horizontal,
        };

        setDirection(newDirection);
        setPrevPosition({ x: scrollX, y: scrollY });
        timeoutId = null;
      }, throttle);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [throttle, element, prevPosition, direction]);

  return direction;
}

/**
 * Hook to check if user has scrolled past a certain threshold
 * @param threshold - Scroll position threshold in pixels
 * @param options - Configuration options
 * @returns Boolean indicating if scrolled past threshold
 * 
 * @example
 * const hasScrolled = useScrollThreshold(100);
 */
export function useScrollThreshold(
  threshold: number = 0,
  options: UseScrollPositionOptions = {}
): boolean {
  const position = useScrollPosition(options);
  return position.y > threshold;
}

/**
 * Hook to track if user is at the top of the page
 * @param offset - Offset from top in pixels (default: 0)
 * @returns Boolean indicating if at top
 * 
 * @example
 * const isAtTop = useIsAtTop();
 */
export function useIsAtTop(offset: number = 0): boolean {
  const position = useScrollPosition({ throttle: 50 });
  return position.y <= offset;
}

/**
 * Hook to track if user is at the bottom of the page
 * @param offset - Offset from bottom in pixels (default: 0)
 * @param options - Configuration options
 * @returns Boolean indicating if at bottom
 * 
 * @example
 * const isAtBottom = useIsAtBottom();
 */
export function useIsAtBottom(
  offset: number = 0,
  options: UseScrollPositionOptions = {}
): boolean {
  const { element = null } = options;
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = element || window;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkIfAtBottom = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        if (element) {
          const bottom =
            element.scrollHeight - element.scrollTop - element.clientHeight <=
            offset;
          setIsBottom(bottom);
        } else {
          const bottom =
            document.documentElement.scrollHeight -
              window.scrollY -
              window.innerHeight <=
            offset;
          setIsBottom(bottom);
        }
        timeoutId = null;
      }, 100);
    };

    checkIfAtBottom();
    target.addEventListener("scroll", checkIfAtBottom, { passive: true });
    window.addEventListener("resize", checkIfAtBottom);

    return () => {
      target.removeEventListener("scroll", checkIfAtBottom);
      window.removeEventListener("resize", checkIfAtBottom);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [offset, element]);

  return isBottom;
}

/**
 * Hook to get scroll progress as a percentage (0-100)
 * @param options - Configuration options
 * @returns Scroll progress percentage
 * 
 * @example
 * const progress = useScrollProgress();
 */
export function useScrollProgress(
  options: UseScrollPositionOptions = {}
): number {
  const { element = null } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const target = element || window;
    let timeoutId: NodeJS.Timeout | null = null;

    const calculateProgress = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        if (element) {
          const scrolled = element.scrollTop;
          const height = element.scrollHeight - element.clientHeight;
          const progressValue = height > 0 ? (scrolled / height) * 100 : 0;
          setProgress(Math.min(Math.max(progressValue, 0), 100));
        } else {
          const scrolled = window.scrollY;
          const height =
            document.documentElement.scrollHeight - window.innerHeight;
          const progressValue = height > 0 ? (scrolled / height) * 100 : 0;
          setProgress(Math.min(Math.max(progressValue, 0), 100));
        }
        timeoutId = null;
      }, 50);
    };

    calculateProgress();
    target.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress);

    return () => {
      target.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [element]);

  return progress;
}