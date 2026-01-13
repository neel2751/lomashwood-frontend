import { useEffect, useRef, useState, RefObject } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Callback fired when intersection changes */
  onChange?: (entry: IntersectionObserverEntry) => void;
  /** Fire callback only once when element becomes visible */
  triggerOnce?: boolean;
  /** Enable the observer (useful for conditional observing) */
  enabled?: boolean;
}

export interface IntersectionObserverResult {
  /** Reference to attach to the observed element */
  ref: RefObject<HTMLElement>;
  /** Current intersection entry */
  entry: IntersectionObserverEntry | null;
  /** Whether the element is currently intersecting */
  isIntersecting: boolean;
  /** Whether the element has intersected at least once */
  hasIntersected: boolean;
}

/**
 * Custom hook to observe element visibility using Intersection Observer API
 * @param options - Intersection observer options
 * @returns Object containing ref, entry, and intersection state
 * 
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.5,
 *   triggerOnce: true
 * });
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverResult {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    onChange,
    triggerOnce = false,
    enabled = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already intersected, don't observe
    if (triggerOnce && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) {
          setHasIntersected(true);
        }

        onChange?.(entry);

        // Unobserve after first intersection if triggerOnce is true
        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, onChange, triggerOnce, enabled, hasIntersected]);

  return {
    ref,
    entry,
    isIntersecting,
    hasIntersected,
  };
}

/**
 * Hook for lazy loading images when they enter viewport
 * @param options - Intersection observer options
 * @returns Object containing ref and loading state
 * 
 * @example
 * const { ref, shouldLoad } = useIntersectionObserverLazy({ rootMargin: "100px" });
 * <img ref={ref} src={shouldLoad ? imageUrl : placeholder} />
 */
export function useIntersectionObserverLazy(
  options: Omit<UseIntersectionObserverOptions, "triggerOnce"> = {}
) {
  const { ref, hasIntersected } = useIntersectionObserver({
    ...options,
    triggerOnce: true,
  });

  return {
    ref,
    shouldLoad: hasIntersected,
  };
}

/**
 * Hook for triggering animations when element enters viewport
 * @param options - Intersection observer options
 * @returns Object containing ref and animation trigger state
 * 
 * @example
 * const { ref, shouldAnimate } = useIntersectionObserverAnimation();
 * <div ref={ref} className={shouldAnimate ? "animate-fade-in" : ""} />
 */
export function useIntersectionObserverAnimation(
  options: Omit<UseIntersectionObserverOptions, "triggerOnce"> = {}
) {
  const { ref, hasIntersected } = useIntersectionObserver({
    ...options,
    threshold: options.threshold ?? 0.1,
    triggerOnce: true,
  });

  return {
    ref,
    shouldAnimate: hasIntersected,
  };
}

/**
 * Hook for infinite scroll implementation
 * @param callback - Function to call when element is visible
 * @param options - Intersection observer options
 * @returns Object containing ref and loading state
 * 
 * @example
 * const { ref, isIntersecting } = useIntersectionObserverInfiniteScroll(
 *   () => loadMore(),
 *   { rootMargin: "200px" }
 * );
 * <div ref={ref}>Loading...</div>
 */
export function useIntersectionObserverInfiniteScroll(
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    ...options,
    rootMargin: options.rootMargin ?? "200px",
    threshold: options.threshold ?? 0,
  });

  useEffect(() => {
    if (isIntersecting && !isLoading) {
      setIsLoading(true);
      callback();
      
      // Reset loading state after callback
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isIntersecting, callback, isLoading]);

  return {
    ref,
    isIntersecting,
    isLoading,
  };
}

/**
 * Hook for tracking element visibility percentage
 * @param options - Intersection observer options
 * @returns Object containing ref and visibility ratio
 * 
 * @example
 * const { ref, visibilityRatio } = useIntersectionObserverRatio();
 * <div ref={ref}>Visible: {(visibilityRatio * 100).toFixed(0)}%</div>
 */
export function useIntersectionObserverRatio(
  options: UseIntersectionObserverOptions = {}
) {
  const [visibilityRatio, setVisibilityRatio] = useState(0);

  const { ref} = useIntersectionObserver({
    ...options,
    onChange: (entry) => {
      setVisibilityRatio(entry.intersectionRatio);
      options.onChange?.(entry);
    },
  });

  return {
    ref,
    visibilityRatio,
    isFullyVisible: visibilityRatio >= 1,
    isPartiallyVisible: visibilityRatio > 0,
  };
}

/**
 * Hook for tracking multiple elements with a single observer
 * @param options - Intersection observer options
 * @returns Function to register elements and Map of their states
 * 
 * @example
 * const { observe, entries } = useIntersectionObserverMultiple();
 * <div ref={(el) => el && observe(el, "item-1")} />
 * <div ref={(el) => el && observe(el, "item-2")} />
 */
export function useIntersectionObserverMultiple(
  options: IntersectionObserverInit = {}
) {
  const [entries, setEntries] = useState<Map<string, IntersectionObserverEntry>>(
    new Map()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<Element, string>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      setEntries((prev) => {
        const next = new Map(prev);
        entries.forEach((entry) => {
          const id = elementsRef.current.get(entry.target);
          if (id) {
            next.set(id, entry);
          }
        });
        return next;
      });
    }, options);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);

  const observe = (element: Element, id: string) => {
    if (observerRef.current) {
      elementsRef.current.set(element, id);
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (observerRef.current) {
      const id = elementsRef.current.get(element);
      if (id) {
        elementsRef.current.delete(element);
        setEntries((prev) => {
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
      }
      observerRef.current.unobserve(element);
    }
  };

  return {
    observe,
    unobserve,
    entries,
  };
}

/**
 * Hook for sticky header that appears/disappears based on scroll
 * @param options - Intersection observer options
 * @returns Object containing ref and sticky state
 * 
 * @example
 * const { ref, isSticky } = useIntersectionObserverSticky();
 * <header className={isSticky ? "fixed top-0" : ""}>
 *   <div ref={ref} /> // Sentinel element
 * </header>
 */
export function useIntersectionObserverSticky(
  options: UseIntersectionObserverOptions = {}
) {
  const { ref, isIntersecting } = useIntersectionObserver({
    ...options,
    threshold: options.threshold ?? 1,
  });

  return {
    ref,
    isSticky: !isIntersecting,
    isVisible: isIntersecting,
  };
}