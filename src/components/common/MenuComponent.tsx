import { useCallback, useMemo } from "react";
import clsx from "clsx";
import { isObject } from "lodash-es";
import {
  type MenuProps,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@Utilities";

type Props<T extends string | Record<string, string>> = {
  value?: T;
  options: T[];
  optionIdKey?: string;
  optionLabelKey?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  onChange?: (data: T) => void;
} & MenuProps;

/**
 * A reusable dropdown menu component built with Headless UI.
 *
 * @template T - The type of options, which can be either strings or objects with string keys.
 * @param value - The currently selected value.
 * @param options - The available options to choose from.
 * @param optionIdKey - The key used to extract the unique identifier for object-based options.
 * @param optionLabelKey - The key used to extract the display label for object-based options.
 * @param className - Additional class names for styling.
 * @param label - Optional label for the menu.
 * @param placeholder - Placeholder text displayed when no value is selected.
 * @param onChange - Callback function triggered when an option is selected.
 * @param menuProps - Additional props passed to the `Menu` component.
 */
function MenuComponent<T extends string | Record<string, string>>(
  props: Props<T>,
) {
  const {
    value,
    options,
    optionIdKey = "id",
    optionLabelKey = "label",
    className,
    label,
    placeholder = "Select one",
    onChange,
    ...menuProps
  } = props;

  const onClick = (item: T) => {
    if (onChange) onChange(item);
  };

  const getDisplayText = useCallback(
    (value: T) =>
      (isObject(value) ? value[optionLabelKey] : value) as string,
    [optionLabelKey],
  );

  const valueDisplay = useMemo(
    () => value && getDisplayText(value),
    [value, getDisplayText],
  );

  return (
    <Menu
      as="div"
      className={cn("w-full space-y-3", className)}
      {...menuProps}
    >
      {label && <p>{label}</p>}
      <MenuButton
        className={clsx(
          "relative block w-full flex items-center justify-between mt-3 bg-gray-600 custom-inner-shadow__top px-3 py-2 md:px-4 md:py-3 rounded-[28px]",
          { "text-gray-400": !value },
        )}
      >
        <p>{valueDisplay || placeholder}</p>
        <ChevronDownIcon
          className="size-4 md:size-5 stroke-current stroke-1.5"
          aria-hidden="true"
        />
      </MenuButton>
      <MenuItems
        as="div"
        className="scrollable w-[var(--button-width)] absolute size-full z-50 py-0.5 rounded-lg bg-gray-600 max-h-40 overflow-y-auto"
      >
        {options.map((item) => (
          <MenuItem
            key={isObject(item) ? item[optionIdKey] : item}
            as="div"
            className="px-4 py-3 cursor-pointer hover:bg-gray-700"
            onClick={() => onClick(item)}
          >
            <p>{getDisplayText(item)}</p>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default MenuComponent;
