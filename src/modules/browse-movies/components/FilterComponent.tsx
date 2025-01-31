import type { HTMLAttributes } from "react";
import { ButtonComponent, MenuComponent } from "@GlobalComponents";
import { cn } from "@Utilities";
import { useSharedQueries } from "../../shared";
import { useBrowseMovieStore } from "../store";
import { BrowseMovieHooks, RATING_OPTIONS } from "../utils";
import FilterItemComponent from "./FilterItemComponent";

type Props = {
  hideTitle?: boolean;
  hideButton?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function FilterComponent(props: Props) {
  const { hideTitle, hideButton, className, ...divProps } = props;

  const { genreList } = useSharedQueries();
  const { filters } = useBrowseMovieStore();

  const { useVariables, useActions } = BrowseMovieHooks;
  const { isApplyFilters, popularityOptions, decades, yearsInDecade } =
    useVariables();
  const { onClickFilterItem, onClickFilterButton } = useActions();

  return (
    <div className={cn("space-y-4", className)} {...divProps}>
      {(!hideTitle || !hideButton) && (
        <div
          className={cn("flex items-center justify-between", {
            "justify-end": hideTitle,
          })}
        >
          {!hideTitle && <h1>Browse Movies</h1>}
          {!hideButton && (
            <ButtonComponent
              variant="underline"
              text={isApplyFilters ? "Apply Filters" : "Clear Filters"}
              onClick={onClickFilterButton}
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
                isActive={filters.popularity === item}
                onClick={() => onClickFilterItem("popularity", item)}
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
                isActive={filters.rating === item}
                onClick={() => onClickFilterItem("rating", item)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Genre</p>
          <div className="flex flex-wrap gap-1.5">
            {genreList?.map((item) => (
              <FilterItemComponent
                key={item.id}
                data={item}
                labelKey="name"
                isActive={filters.genres.includes(item)}
                onClick={() => onClickFilterItem("genres", item)}
              />
            ))}
          </div>
        </div>
        {decades && (
          <div className="flex flex-col gap-3">
            <MenuComponent
              value={filters.decade}
              label="Decade"
              options={decades}
              onChange={(value) => onClickFilterItem("decade", value)}
            />
          </div>
        )}
        {yearsInDecade && (
          <div className="flex flex-wrap gap-1.5">
            {yearsInDecade.map((item) => (
              <FilterItemComponent
                key={item}
                data={item}
                isActive={filters.year === item}
                onClick={() => onClickFilterItem("year", item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
