type Props = Partial<{ colorStart: string; colorEnd: string }>;

/**
 * A component that renders an SVG element with a linear gradient definition,
 * which can be applied over an SVG element to reflect the gradient color effect.
 *
 * See `ButtonIconComponent` for proper usage.
 *
 * @param colorStart The starting color of the gradient. Defaults to Watchly's primary color `#EF101D`.
 * @param colorEnd The ending color of the gradient. Defaults to Watchly's secondary color `#EF7210`.
 */
function GradientSVGComponent(props: Props) {
  const { colorStart = "#EF101D", colorEnd = "#EF7210" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <title>Gradient SVG</title>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="10%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVGComponent;
