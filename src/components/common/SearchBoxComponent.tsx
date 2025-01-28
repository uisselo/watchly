import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  useState,
} from "react";
import { Input, type InputProps } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@Utilities";
import ButtonIconComponent from "./ButtonIconComponent";

function SearchBoxComponent(props: PropsWithChildren<InputProps>) {
  const { children, className, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={cn(
        "custom-inner-shadow__top flex gap-1 relative px-3 py-2 bg-gray-600 md:px-4 md:py-3 rounded-[28px]",
        className,
      )}
    >
      <Input
        className="w-full bg-transparent focus:outline-none"
        placeholder="Search"
        {...{ onFocus, onBlur }}
        {...inputProps}
      />

      {focused && (
        <div className="absolute -inset-0.5 custom-bg-gradient -z-20 rounded-[28px] group-hover:bg-gray-200" />
      )}
      {children}
    </div>
  );
}

SearchBoxComponent.ButtonIcon = ButtonIcon;

export default SearchBoxComponent;

function ButtonIcon(
  props: { isSearch: boolean } & ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { isSearch, ...buttonProps } = props;
  const icon = isSearch ? MagnifyingGlassIcon : XMarkIcon;

  return (
    <ButtonIconComponent
      icon={icon}
      iconClassName="size-4 md:size-5"
      {...buttonProps}
    />
  );
}
