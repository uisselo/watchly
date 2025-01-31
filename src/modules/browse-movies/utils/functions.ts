import moment from "moment";
import { formatDate } from "@Utilities";
import type { BrowseMovieFilters } from "../store";
import type { GenreItem } from "../../shared";

/**
 * Gets the start and end dates for a specified time range ("week", "month", or "year").
 *
 * @param type - The type of range to calculate:
 *    - "week" for the current week.
 *    - "month" for the current month.
 *    - "year" for the current year.
 * @returns An object containing the `start_date` and `end_date` formatted as "YYYY-MM-DD".
 */
function getRange(type: "week" | "month" | "year") {
  return {
    start_date: formatDate(moment().startOf(type), "YYYY-MM-DD"),
    end_date: formatDate(moment().endOf(type), "YYYY-MM-DD"),
  };
}

/**
 * Updates a specific filter item in the movie browsing filters.
 *
 * @param filters - The current set of movie filters.
 * @param key - The key of the filter to update (e.g., "popularity", "decade", "year").
 * @param value - The new value for the filter.
 * @returns A new filters object with the updated value, ensuring:
 *    - If updating "decade" or "year", it also updates "popularity" to reflect the selection.
 *    - If updating "popularity" without selecting "Most" or "Least", it clears "decade" and "year".
 *    - If the selected value is already applied, it resets the filter by clearing it.
 */
function updateFilterItem(
  filters: BrowseMovieFilters,
  key: keyof BrowseMovieFilters,
  value: string,
) {
  const isDecadeOrYearSelected = ["decade", "year"].includes(key);
  const isNotMostOrLeast =
    key === "popularity" &&
    !["Most", "Least"].includes(value.split(" ")[0]);

  return {
    ...filters,
    ...(isDecadeOrYearSelected && {
      popularity: `Most popular: ${value}`,
    }),
    ...(isNotMostOrLeast && {
      decade: "",
      year: "",
    }),
    [key]: filters[key] === value ? "" : value,
  };
}

/**
 * Updates the genre filter by adding or removing a genre.
 *
 * @param filters - The current set of movie filters.
 * @param data - The genre item to add or remove.
 * @returns A new filters object with the updated list of genres.
 *    - If the genre already exists in the filter, it is removed.
 *    - If the genre is not present, it is added.
 */
function updateGenreFilterItem(
  filters: BrowseMovieFilters,
  data: GenreItem,
): BrowseMovieFilters {
  const updatedGenres = filters.genres.some((g) => g.id === data.id)
    ? filters.genres.filter((g) => g.id !== data.id)
    : [...filters.genres, data];

  return {
    ...filters,
    genres: updatedGenres,
  };
}

export { getRange, updateFilterItem, updateGenreFilterItem };
