import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {

  onChange?: (entry: IntersectionObserverEntry) => void;

  triggerOnce?: boolean;

  enabled?: boolean;
}

export interface IntersectionObserverResult {

  ref: RefObject<HTMLElement>;

  entry: IntersectionObserverEntry | null;

  isIntersecting: boolean;

  hasIntersected: boolean;
}

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

    if (triggerOnce && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) {
          setHasIntersected(true);
        }

        onChange?.(entry);

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