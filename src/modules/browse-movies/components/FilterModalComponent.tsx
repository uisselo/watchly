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

  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <div className="container pb-12 space-y-12">
      <div className="flex justify-between py-4">
        <ButtonIconComponent icon={ChevronLeftIcon} onClick={onClose} />
        <h1>Filter Movies</h1>
        <ButtonComponent
          variant="underline"
          size="xs"
          text={isApply ? "Apply" : "Clear"}
          onClick={handleClick}
        />
      </div>
      <FilterComponent hideTitle hideButton />
    </div>
  );
}

export default FilterModalComponent;
