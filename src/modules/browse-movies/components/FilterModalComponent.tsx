import { ButtonComponent, ButtonIconComponent } from "@GlobalComponents";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import FilterComponent from "./FilterComponent";

type Props = {
  isApply: boolean;
  onClose: () => void;
  onClick: () => void;
};

function FilterModalComponent(props: Props) {
  const { onClose, onClick, isApply } = props;

  return (
    <div className="container py-4 space-y-12">
      <div className="flex justify-between">
        <ButtonIconComponent icon={ChevronLeftIcon} onClick={onClose} />
        <h1>Filter Movies</h1>
        <ButtonComponent
          variant="underline"
          size="xs"
          text={isApply ? "Apply" : "Clear"}
          onClick={onClick}
        />
      </div>
      <FilterComponent />
    </div>
  );
}

export default FilterModalComponent;
