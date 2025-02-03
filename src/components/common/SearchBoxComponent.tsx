import {
  type ButtonHTMLAttributes,
  type ElementType,
  type PropsWithChildren,
  useState,
} from "react";
import {
  ComboboxInput,
  type ComboboxInputProps,
  Input,
  type InputProps,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@Utilities";
import ButtonIconComponent from "./ButtonIconComponent";

type Props =
  | ({ isAutocomplete: true } & PropsWithChildren<ComboboxInputProps>)
  | ({ isAutocomplete?: false } & PropsWithChildren<InputProps>);

/**
 * A search box component with an input field and optional search/clear icons.
 * The component can either be a simple input or a combobox based on the `isAutocomplete` prop.
 *
 * @param isAutocomplete - If true, the component will render a combobox input.
 * @param children - Optional child elements to be displayed inside the search box.
 * @param className - Additional class names for styling the search box.
 * @param inputProps - Additional props passed to the `Input` component.
 */
function SearchBoxComponent(props: Props) {
  const { children, isAutocomplete, className, ...inputProps } = props;
  const Element: ElementType = isAutocomplete ? ComboboxInput : Input;

  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div
      className={cn(
        "custom-inner-shadow__top grow flex items-center gap-1 relative px-3 py-2 bg-gray-600 md:px-4 md:py-3 rounded-[28px]",
        className,
      )}
    >
      <Element
        className="w-full bg-transparent focus:outline-none grow"
        placeholder="Search"
        {...{ onFocus, onBlur }}
        {...inputProps}
      />
      {children || (
        <MagnifyingGlassIcon className="stroke-gray-400 stroke-1.5 size-4 md:size-5" />
      )}
      {focused && (
        <div className="absolute -inset-0.5 custom-bg-gradient -z-20 rounded-[28px] group-hover:bg-gray-200" />
      )}
    </div>
  );
}

SearchBoxComponent.ButtonIcon = ButtonIcon;

export default SearchBoxComponent;

/**
 * A button component that toggles between a search and a clear (X) icon.
 *
 * @param isSearch - Determines whether to show the search icon or the clear (X) icon.
 * @param buttonProps - Additional props passed to the button component.
 */
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
