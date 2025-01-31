import { useMediaQuery } from "@uidotdev/usehooks";

/**
 * Custom hook that provides information about the current screen size.
 * It uses media queries to determine if the screen width falls within
 * small, medium, or large categories based on predefined breakpoints.
 *
 * @returns An object containing boolean values for small, medium, and large screens.
 *    - isSmallScreen - `true` if the screen width is less than or equal to 743px.
 *    - isMediumScreen - `true` if the screen width is between 744px and 1023px (inclusive).
 *    - isLargeScreen - `true` if the screen width is 1024px or larger.
 */
function useBreakpoints() {
  const isSmallScreen = useMediaQuery("(max-width: 743px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 744px) and (max-width: 1023px)",
  );
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return { isSmallScreen, isMediumScreen, isLargeScreen };
}

export { useBreakpoints };
