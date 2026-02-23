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

  throttle?: number;

  element?: HTMLElement | null;
}

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

export function useScrollThreshold(
  threshold: number = 0,
  options: UseScrollPositionOptions = {}
): boolean {
  const position = useScrollPosition(options);
  return position.y > threshold;
}

export function useIsAtTop(offset: number = 0): boolean {
  const position = useScrollPosition({ throttle: 50 });
  return position.y <= offset;
}

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