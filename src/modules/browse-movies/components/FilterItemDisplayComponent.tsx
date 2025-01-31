import type { ButtonHTMLAttributes } from "react";
import { capitalize } from "lodash-es";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  label?: string;
  value: string | string[];
} & ButtonHTMLAttributes<HTMLButtonElement>;

function FilterItemDisplayComponent(props: Props) {
  const { label, value, onClick, ...buttonProps } = props;

  return (
    <div className="flex gap-1 px-2 py-1 bg-gray-700 rounded w-max">
      <p className="flex gap-1 w-max">
        {label && `${capitalize(label)}:`}
        <span className="font-bold">{value}</span>
      </p>
      {onClick && (
        <button onClick={onClick} {...buttonProps}>
          <XMarkIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export default FilterItemDisplayComponent;
