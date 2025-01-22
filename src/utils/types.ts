import type { FC, SVGProps } from "react";

/**
 * A React functional component that takes in `SVGProps` for an SVG element.
 *
 * This type is used to define the type of Hero icons or any other SVG component.
 *
 * It ensures that the component is compatible with the expected props for rendering SVG elements in React.
 */
export type HeroIconProp = FC<SVGProps<SVGSVGElement>>;
