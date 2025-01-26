import type { ButtonHTMLAttributes } from "react";
import { cn, type HeroIconProp } from "@Utilities";

type ButtonSize = "xs" | "sm" | "base" | "lg" | "xl";
type ButtonVariant = "primary" | "link" | "outline" | "underline";
type ButtonIconPosition = "trailing" | "leading";

type Props = Partial<{
  text: string;
  size: ButtonSize;
  variant: ButtonVariant;
  icon: HeroIconProp;
  iconPosition: ButtonIconPosition;
  isFull: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "text-xs px-2 py-0.5 gap-1",
  sm: "text-sm px-3 py-2 gap-1.5",
  base: "px-4 py-3 gap-2",
  lg: "text-lg px-6 py-4 gap-3",
  xl: "text-xl px-8 py-6 gap-3",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "text-white",
  link: "p-0 text-transparent bg-clip-text",
  outline: "",
  underline: "rounded-none px-0 pt-0 pb-1.5",
};

const ICON_CLASSES: Record<ButtonSize, string> = {
  xs: "size-3.5",
  sm: "size-4",
  base: "size-5",
  lg: "size-6",
  xl: "size-6",
};

/**
 * A customizable button component with support for multiple variants, sizes, and optional icons.
 *
 * @component
 * @param text - The text to display inside the button. Defaults to "Button".
 * @param size - Defaults to `base`. Other values: `xs`, `sm`, `lg`, and `xl`.
 * @param variant - The visual style variant of the button. Defaults to `primary`. Other values: `link`, `outline`, and `underline`.
 * @param icon - An optional icon to display alongside the button text.
 * @param iconPosition - The position of the icon relative to the text. Defaults to `leading`. Other value: `trailing`.
 * @param isFull - If `true`, the button will take the full width of its container. Defaults to `false`.
 * @param className - Additional custom class names to apply to the button.
 * @param buttonProps - Additional props to pass to the underlying button component, such as `onClick`, `aria-label`, `disabled`, etc.
 */
function ButtonComponent(props: Props) {
  const {
    text = "Button",
    size = "base",
    variant = "primary",
    icon: Icon,
    iconPosition = "leading",
    isFull,
    className,
    ...buttonProps
  } = props;

  /**
   * Renders the optional icon if provided.
   *
   * @function renderIcon
   * @private
   */
  const renderIcon = (): JSX.Element | null => {
    if (!Icon) return null;

    return (
      <Icon
        className={cn(
          ICON_CLASSES[size],
          iconPosition === "trailing" ? "stroke-primary" : "stroke-secondary",
          { "stroke-white": variant === "primary" },
          "stroke-1.5",
        )}
      />
    );
  };

  /**
   * Renders additional content for the "outline" and "underline" variants.
   *
   * @function renderVariantContent
   * @private
   * @description Displays a border or underline with gradient color. This is
   * positioned absolutely and overlays the button's main content to match its
   * width and height, creating the desired visual effect.
   */
  const renderVariantContent = (): JSX.Element | null => {
    const isOutline = variant === "outline";
    const isUnderline = variant === "underline";

    if (!isOutline && !isUnderline) return null;

    return (
      <div
        className={cn(
          "flex justify-center items-center absolute bg-gray-800",
          { "inset-0.5 rounded-[28px]": isOutline },
          { "inset-x-0 top-0 bottom-0.5 rounded-none": isUnderline },
        )}
      >
        <div
          className={cn(
            "flex items-center text-transparent bg-clip-text custom-bg-gradient",
            SIZE_CLASSES[size],
            { "flex-row-reverse": iconPosition === "trailing" },
            { "p-0": isOutline },
            { "px-0 pt-0 pb-1.5": isUnderline },
          )}
        >
          <span>{text}</span>
          {renderIcon()}
        </div>
      </div>
    );
  };

  return (
    <button
      className={cn(
        "relative flex justify-center items-center font-semibold rounded-[28px] custom-bg-gradient transition duration-300 ease-in-out transform",
        { "hover:scale-105": variant === "primary" },
        { "flex-row-reverse": iconPosition === "trailing" },
        isFull ? "w-full" : "w-max",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className,
      )}
      {...buttonProps}
    >
      {text}
      {renderIcon()}
      {renderVariantContent()}
    </button>
  );
}

export default ButtonComponent;
