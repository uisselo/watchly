import type { ButtonHTMLAttributes } from "react";
import type { GenreItem } from "../../shared";
import { cn } from "@Utilities";

type Props<T extends string | GenreItem> = {
  data: T;
  labelKey?: T extends GenreItem ? keyof T : never;
  isActive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function FilterItemComponent<T extends string | GenreItem>(props: Props<T>) {
  const { data, labelKey, isActive, ...buttonProps } = props;

  const getLabel = () => {
    if (labelKey) {
      return data[labelKey] as string;
    }

    return data as string;
  };

  return (
    <button
      className={cn(
        "custom-inner-shadow__bottom custom-bg-gradient px-2 py-1.5 md:px-3 md:py-2 rounded-[28px]",
        { "bg-gray-600 bg-none": !isActive },
      )}
      {...buttonProps}
    >
      <p>{getLabel()}</p>
    </button>
  );
}

export default FilterItemComponent;
