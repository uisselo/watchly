import type { HTMLAttributes } from "react";
import { ButtonComponent, MenuComponent } from "@GlobalComponents";
import { cn } from "@Utilities";
import { useSharedQueries } from "../../shared";
import { RATING_OPTIONS } from "../constants";
import { useBrowseMovies } from "../useBrowseMovies";
import FilterItemComponent from "./FilterItemComponent";

type Props = {
  showTitle?: boolean;
  isApply?: boolean;
  onClick?: () => void;
} & HTMLAttributes<Omit<HTMLDivElement, "onClick">>;

function FilterComponent(props: Props) {
  const { showTitle, isApply, className, onClick, ...divProps } = props;
  const { genreList } = useSharedQueries();
  const {
    payload,
    decades,
    yearsInDecade,
    popularityOptions,
    onClickFilterItem,
  } = useBrowseMovies();

  if (!genreList) return null;

  return (
    <div className={cn("space-y-4", className)} {...divProps}>
      {(showTitle || onClick) && (
        <div
          className={cn("flex justify-between", {
            "justify-end": !showTitle && !!onClick,
          })}
        >
          {showTitle && <h1>Browse Movies</h1>}
          {onClick && (
            <ButtonComponent
              variant="underline"
              text={isApply ? "Apply Filters" : "Clear Filters"}
              onClick={onClick}
            />
          )}
        </div>
      )}
      <div className="space-y-6 md:p-5 md:bg-gray-700 md:rounded-xl">
        <div className="flex flex-col gap-3">
          <p>Popularity</p>
          <div className="flex flex-wrap gap-1.5">
            {popularityOptions.map((item) => (
              <FilterItemComponent
                key={item}
                data={item}
                isActive={payload.popularity === item}
                onClick={() => onClickFilterItem(item, "popularity")}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Rating</p>
          <div className="flex flex-wrap gap-1.5">
            {RATING_OPTIONS.map((item) => (
              <FilterItemComponent
                key={item}
                data={item}
                isActive={payload.rating === item}
                onClick={() => onClickFilterItem(item, "rating")}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Genre</p>
          <div className="flex flex-wrap gap-1.5">
            {genreList.map((item) => (
              <FilterItemComponent
                key={item.id}
                data={item}
                labelKey="name"
                isActive={payload.genres.includes(item)}
                onClick={() => onClickFilterItem(item, "genres")}
              />
            ))}
          </div>
        </div>
        {decades && (
          <div className="flex flex-col gap-3">
            <MenuComponent
              value={payload.decade}
              label="Decade"
              options={decades}
              onChange={(value) => onClickFilterItem(value, "decade")}
            />
          </div>
        )}
        {yearsInDecade && (
          <div className="flex flex-wrap gap-1.5">
            {yearsInDecade.map((item) => (
              <FilterItemComponent
                key={item}
                data={item}
                isActive={payload.year === item}
                onClick={() => onClickFilterItem(item, "year")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
