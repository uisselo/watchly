import type { ReactNode } from "react";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type Props<T> = {
  items: T[];
  children?: (props: { item: T }) => ReactNode;
} & Omit<SwiperProps, "children">;

const DEFAULT_BREAKPOINTS = {
  1024: { slidesPerView: 5, spaceBetween: 20 },
  744: { slidesPerView: 4, spaceBetween: 16 },
  0: { slidesPerView: 2, spaceBetween: 16 },
};

/**
 * A generic carousel component that utilizes the Swiper library to display items in a responsive manner.
 *
 * @template T - The type of the items to be displayed in the carousel.
 * @param items - An array of items to be rendered in the carousel.
 * @param children - A render function to define how each item should be displayed.
 * @param swiperProps - Additional Swiper configuration options.
 * This includes breakpoints, navigation, pagination, and other Swiper settings.
 */
function CarouselComponent<T>(props: Props<T>) {
  const {
    children,
    items,
    breakpoints = DEFAULT_BREAKPOINTS,
    ...swiperProps
  } = props;

  return (
    <Swiper breakpoints={breakpoints} modules={[Autoplay]} {...swiperProps}>
      {children &&
        items.map((item, index) => (
          <SwiperSlide key={String(index)}>{children({ item })}</SwiperSlide>
        ))}
    </Swiper>
  );
}

export default CarouselComponent;
