import { Link, type LinkProps } from "react-router";
import { cn } from "@Utilities";
import clsx from "clsx";

type Props = {
  text?: string;
  isDesktop?: boolean;
  isActive?: boolean;
} & LinkProps;

function NavItemComponent(props: Props) {
  const {
    text = "Label",
    isDesktop,
    isActive,
    className,
    ...linkProps
  } = props;

  return (
    <Link
      className={cn(
        "font-medium relative bg-gray-800",
        isDesktop ? "w-max" : "w-full p-4 border-b border-gray-600",
        className,
      )}
      {...linkProps}
    >
      <div
        className={clsx({
          "text-transparent bg-clip-text custom-bg-gradient w-max":
            isActive,
        })}
      >
        <p className="font-semibold md:text-left">{text}</p>
      </div>
      {isActive && (
        <div className="absolute inset-x-0 top-0 translate-y-8 h-[1px] custom-bg-gradient -z-20" />
      )}
    </Link>
  );
}

export default NavItemComponent;
