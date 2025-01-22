import { Link, type LinkProps } from "react-router";
import { cn } from "@Utilities";

type Props = { text?: string; isDesktop?: boolean } & LinkProps;

function NavItemComponent(props: Props) {
  const { text = "Label", isDesktop, className, ...linkProps } = props;

  return (
    <Link
      className={cn(
        "font-medium",
        isDesktop ? "w-max" : "w-full p-4 border-b border-gray-600",
        className,
      )}
      {...linkProps}
    >
      <p>{text}</p>
    </Link>
  );
}

export default NavItemComponent;
