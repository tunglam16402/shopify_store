"use client";

import styles from "./style.module.css";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
  useLayoutEffect,
} from "react";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  slidesToShow?: number;
  itemsToScroll?: number;
  enableTouchScroll?: boolean;
  swipeThreshold?: number;
  autoPlay?: boolean;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  responsiveConfig?: {
    breakpoint: number;
    showArrows?: boolean;
    slidesToShow: number;
    itemsToScroll?: number;
  }[];
};

export function Carousel<T>({
  items,
  renderItem,
  slidesToShow = 1,
  itemsToScroll = slidesToShow,
  swipeThreshold = 0.5,
  enableTouchScroll = true,
  autoPlay = false,
  loop = false,
  showArrows = false,
  showDots = true,
  responsiveConfig = [],
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(slidesToShow);
  const [itemsToScrollState, setItemsToScroll] = useState(itemsToScroll);
  const [showArrowsState, setShowArrowsState] = useState(showArrows ?? false);
  const startX = useRef(0);
  const dragOffsetRef = useRef(0);
  const isPointerDown = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const isAtStart = useMemo(() => currentIndex === 0, [currentIndex]);
  const isAtEnd = useMemo(
    () => currentIndex + visibleItems >= items.length,
    [currentIndex, visibleItems, items.length]
  );

  const startTime = useRef(0);

  // Responsive slidesToShow
  useLayoutEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      const matched = responsiveConfig
        .slice()
        .sort((a, b) => b.breakpoint - a.breakpoint)
        .find((r) => width >= r.breakpoint);

      if (matched) {
        setVisibleItems(matched.slidesToShow);
        setItemsToScroll(matched.itemsToScroll ?? matched.slidesToShow);
        setShowArrowsState(matched.showArrows ?? false);
      } else {
        setVisibleItems(slidesToShow);
        setItemsToScroll(itemsToScroll);
        setShowArrowsState(showArrows ?? false);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [responsiveConfig, slidesToShow, itemsToScroll, showArrows]);

  //next button
  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = items.length - visibleItems;
      const nextIndex = prev + itemsToScrollState;

      if (nextIndex > maxIndex) {
        if (loop) {
          return prev === maxIndex ? 0 : maxIndex;
        } else {
          return maxIndex;
        }
      }

      return nextIndex;
    });
  }, [itemsToScrollState, items.length, visibleItems, loop]);

  //preivious button
  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      const minIndex = 0;
      const prevIndex = prev - itemsToScrollState;

      if (prevIndex < minIndex) {
        if (loop) {
          return prev === 0 ? items.length - visibleItems : 0;
        } else {
          return 0;
        }
      }

      return prevIndex;
    });
  }, [itemsToScrollState, items.length, visibleItems, loop]);

  // Swipe
  const onPointerDown = (e: React.PointerEvent) => {
    startTime.current = Date.now();
    startX.current = e.clientX;
    isPointerDown.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !trackRef.current) return;

    const delta = e.clientX - startX.current;

    if (!loop && ((isAtStart && delta > 0) || (isAtEnd && delta < 0))) return;

    dragOffsetRef.current = delta;

    const movePercent = (delta / trackRef.current.offsetWidth) * 100;
    trackRef.current.style.transform = `translateX(calc(-${
      currentIndex * (100 / visibleItems)
    }% + ${movePercent}%))`;
  };

  const onPointerUp = () => {
    if (!trackRef.current || !isPointerDown.current) return;
    isPointerDown.current = false;

    const endTime = Date.now();
    const duration = endTime - startTime.current;
    const moved = dragOffsetRef.current;
    const velocity = Math.abs(moved / duration);

    const isFlick = velocity > 0.5;

    trackRef.current.style.transition = "transform 0.5s ease";

    if (isFlick) {
      if (moved > 0) prev();
      else next();
    } else {
      const itemWidthPx = trackRef.current.offsetWidth / visibleItems;
      const threshold = itemWidthPx * itemsToScrollState * swipeThreshold;

      if (moved > threshold) prev();
      else if (moved < -threshold) next();
      else
        trackRef.current.style.transform = `translateX(-${
          currentIndex * (100 / visibleItems)
        }%)`;
    }

    dragOffsetRef.current = 0;
  };

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;

    if (!loop && currentIndex >= items.length - visibleItems) return;

    const timer = setTimeout(() => {
      next();
    }, 3000);
    return () => clearTimeout(timer);
  }, [autoPlay, currentIndex, next, loop, items.length, visibleItems]);

  //Dot page
  const maxIndex = items.length - visibleItems;
  const dotCount = Math.ceil(maxIndex / itemsToScrollState) + 1;

  const dotTargets = useMemo(
    () =>
      Array.from({ length: dotCount }, (_, i) =>
        Math.min(i * itemsToScrollState, maxIndex)
      ),
    [dotCount, itemsToScrollState, maxIndex]
  );

  const activeDotIndex = dotTargets.findIndex(
    (target) => currentIndex <= target && target < currentIndex + visibleItems
  );

  return (
    <div className="relative w-full overflow-hidden">
      {items.length === 0 ? (
        <div className="flex justify-center  items-center h-64 text-gray-500 text-lg">
          There is no item
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center">
            {showArrowsState && (!isAtStart || loop) && (
              <button
                onClick={prev}
                className={`${styles.scrollButton} ${styles.leftButton}`}
              >
                &lt;
              </button>
            )}

            <div className="w-full overflow-hidden">
              <div
                ref={trackRef}
                className={`${styles.carouselTrack} flex`}
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleItems)
                  }%)`,
                  transition: "transform 0.5s ease",
                }}
                onPointerDown={enableTouchScroll ? onPointerDown : undefined}
                onPointerMove={enableTouchScroll ? onPointerMove : undefined}
                onPointerUp={enableTouchScroll ? onPointerUp : undefined}
                onPointerLeave={enableTouchScroll ? onPointerUp : undefined}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 items-center justify-center flex"
                    style={{ width: `${100 / visibleItems}%` }}
                  >
                    {renderItem(item, index)}
                  </div>
                ))}
              </div>
            </div>

            {showArrowsState && (!isAtEnd || loop) && (
              <button
                onClick={next}
                className={`${styles.scrollButton} ${styles.rightButton}`}
              >
                &gt;
              </button>
            )}
          </div>

          {showDots && (
            <div className="flex justify-center gap-1 mt-6">
              {dotTargets.map((targetIndex, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(targetIndex)}
                  className={`w-2 h-2 rounded-full ${
                    i === activeDotIndex ? "bg-black" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
