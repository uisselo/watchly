import { cn, type HeroIconProp } from "@Utilities";
import GradientSVGComponent from "./GradientSVGComponent";
import type { ButtonHTMLAttributes } from "react";

type Props = {
  icon: HeroIconProp;
  iconClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A button component that displays an icon with a gradient stroke, applying
 * the `GradientSVGComponent` for the gradient effect.
 *
 * See `GradientSVGComponent` for more information about the gradient setup.
 *
 * @param icon - The icon component to display inside the button. This is a required prop.
 * @param className - Additional custom class names to apply to the button.
 * @param buttonProps - Additional props to pass to the underlying button component, such as `onClick`, `aria-label`, `disabled`, etc.
 */
function ButtonIconComponent(props: Props) {
  const { icon: Icon, iconClassName, className, ...buttonProps } = props;

  return (
    <>
      <GradientSVGComponent />
      <button
        className={cn("relative group focus:outline-none", className)}
        {...buttonProps}
      >
        <Icon
          className={cn("size-7 stroke-1.5", iconClassName)}
          style={{ stroke: "url(#gradient)" }}
        />
        <div className="absolute rounded-full -inset-1.5 -z-10 transition duration-200 ease-in-out group-active:bg-gray-700" />
      </button>
    </>
  );
}

export default ButtonIconComponent;
