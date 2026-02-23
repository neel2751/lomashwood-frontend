import type { EmblaOptionsType } from "embla-carousel";
import Autoplay, { type AutoplayOptionsType } from "embla-carousel-autoplay";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface UseCarouselOptions {
  loop?: boolean;
  align?: "start" | "center" | "end";
  slidesToScroll?: number;
  skipSnaps?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  stopOnInteraction?: boolean;
}

interface UseCarouselReturn {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: UseEmblaCarouselType[1];
  selectedIndex: number;
  scrollSnaps: number[];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  onDotButtonClick: (index: number) => void;
}

export function useCarousel(options: UseCarouselOptions = {}): UseCarouselReturn {
  const {
    loop = true,
    align = "center",
    slidesToScroll = 1,
    skipSnaps = false,
    autoplay = false,
    autoplayDelay = 3000,
    stopOnInteraction = true,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const emblaOptions: EmblaOptionsType = {
    loop,
    align,
    slidesToScroll,
    skipSnaps,
  };

  const autoplayOptions: AutoplayOptionsType = {
    delay: autoplayDelay,
    stopOnInteraction,
    stopOnMouseEnter: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  };

  const plugins = autoplay ? [Autoplay(autoplayOptions)] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);

  const onSelect = useCallback((api: NonNullable<UseEmblaCarouselType[1]>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const onInit = useCallback((api: NonNullable<UseEmblaCarouselType[1]>) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    onDotButtonClick,
  };
}

export function useCarouselWithThumbnails(options: UseCarouselOptions = {}) {
  const mainCarousel = useCarousel(options);
  const thumbCarousel = useCarousel({
    ...options,
    autoplay: false,
    align: "start",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainCarousel.emblaApi || !thumbCarousel.emblaApi) return;
      mainCarousel.emblaApi.scrollTo(index);
    },
    [mainCarousel.emblaApi, thumbCarousel.emblaApi]
  );

  useEffect(() => {
    if (!mainCarousel.emblaApi || !thumbCarousel.emblaApi) return;

    const selectThumb = () => {
      const selected = mainCarousel.emblaApi?.selectedScrollSnap();
      if (selected !== undefined) {
        thumbCarousel.emblaApi?.scrollTo(selected);
      }
    };

    mainCarousel.emblaApi.on("select", selectThumb);
    return () => {
      mainCarousel.emblaApi?.off("select", selectThumb);
    };
  }, [mainCarousel.emblaApi, thumbCarousel.emblaApi]);

  return {
    mainCarousel,
    thumbCarousel,
    onThumbClick,
  };
}

export function useCarouselProgress(emblaApi: UseEmblaCarouselType[1]): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      const scrollProgress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setProgress(scrollProgress * 100);
    };

    emblaApi.on("scroll", onScroll);
    onScroll();

    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi]);

  return progress;
}