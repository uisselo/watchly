import { useCallback, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  every,
  floor,
  isArray,
  isEmpty,
  isEqual,
  isObject,
  map,
  range,
  toInteger,
} from "lodash-es";
import moment from "moment";
import type { ModalComponentFunctions } from "@GlobalComponents";
import { formatDate } from "@Utilities";
import type { GenreItem } from "../../shared";
import {
  type BrowseMovieFilters,
  type BrowseMoviePayload,
  type BrowseMovieSortBy,
  useBrowseMovieQueries,
  useBrowseMovieStore,
} from "../store";
import { POPULARITY_OPTIONS } from "./constants";
import {
  getRange,
  updateFilterItem,
  updateGenreFilterItem,
} from "./functions";

/**
 * Custom hook that provides various dynamically calculated filter variables for browsing movies.
 * It includes logic for filtering by decade, year, popularity, rating, and genres.
 * Also tracks if filters are applied and provides a reference to the modal component.
 *
 * @returns An object with following variables:
 * - `decades`: An array of decade strings or `undefined` if release years are unavailable.
 * - `yearsInDecade`: An array of year strings for the selected decade or `undefined` if no decade is selected.
 * - `popularityOptions`: An array of popularity filter options, including dynamic options for 'Most popular' and 'Least popular'.
 * - `browseMoviesPayload`: The combined filter payload with all active filters applied.
 * - `filterModalComponentRef`: A reference to the modal component for applying filters.
 * - `isApplyFilters`: A boolean indicating if filters are applied (i.e., if filters differ from appliedFilters).
 * - `isAppliedFiltersEmpty`: A boolean indicating if all applied filters are empty.
 */
function useVariables() {
  const { firstReleaseYear, latestReleaseYear } = useBrowseMovieQueries();
  const { filters, appliedFilters } = useBrowseMovieStore();

  /**
   * Generates a list of decades (e.g., "1990s", "2000s") based on the movie release years.
   *
   * @returns An array of decade strings or `undefined` if release years are unavailable.
   */
  const decades = useMemo(() => {
    if (!firstReleaseYear || !latestReleaseYear) return;

    const start = floor(toInteger(firstReleaseYear) / 10) * 10;
    const end = floor(toInteger(latestReleaseYear) / 10) * 10;

    const result = [];

    for (let year = start; year <= end; year += 10) {
      result.push(`${year}s`);
    }

    return result;
  }, [firstReleaseYear, latestReleaseYear]);

  /**
   * Generates a list of years within the selected decade from `payload.decade`.
   *
   * @returns An array of year strings for the selected decade or `undefined` if no decade is selected.
   */
  const yearsInDecade = useMemo(() => {
    if (!filters.decade) return;

    const decade = toInteger(filters.decade.slice(0, -1));
    const years = range(decade, decade + 10);

    return map(years, String);
  }, [filters.decade]);

  /**
   * Generates a list of popularity filter options, dynamically including 'Most popular' and 'Least popular' based on year or decade.
   *
   * @returns An array of popularity options, including the dynamic `Most popular` and `Least popular` options if a year or decade is selected.
   */
  const popularityOptions = useMemo(() => {
    const value = filters.year || filters.decade;
    const mostPopularText = `Most popular: ${value}`;
    const leastPopularText = `Least popular: ${value}`;

    return value
      ? POPULARITY_OPTIONS.concat(mostPopularText, leastPopularText)
      : POPULARITY_OPTIONS;
  }, [filters.decade, filters.year]);

  /**
   * Generates the payload for filtering movies by popularity.
   *
   * @returns The dynamically generated popularity filter payload, including sorting and date range adjustments.
   */
  const popularityPayload = useMemo(() => {
    if (!filters.popularity.length) return;

    const MAP_POPULARITY_PAYLOAD: Record<string, BrowseMoviePayload> = {
      "All time": {
        vote_count_gte: 1000,
      },
      "This year": {
        primary_release_year: formatDate(moment(), "YYYY"),
      },
      "This month": {
        primary_release_year: "",
        primary_release_date_gte: getRange("month").start_date,
        primary_release_date_lte: getRange("month").end_date,
      },
      "This week": {
        primary_release_year: "",
        primary_release_date_gte: getRange("week").start_date,
        primary_release_date_lte: getRange("week").end_date,
      },
    };

    return {
      ...MAP_POPULARITY_PAYLOAD[filters.popularity],
      sort_by: (filters.popularity.split(" ")[0] === "Least"
        ? "popularity.asc"
        : "popularity.desc") as BrowseMovieSortBy,
    };
  }, [filters.popularity]);

  /**
   * Generates the payload for filtering movies by rating (highest or lowest).
   *
   * @returns The dynamically generated rating filter payload.
   */
  const ratingPayload = useMemo(() => {
    if (!filters.rating.length) return;

    const MAP_RATING_PAYLOAD: Record<string, BrowseMoviePayload> = {
      "Highest first": {
        sort_by: "vote_average.desc",
        vote_count_gte: 1000,
      },
      "Lowest first": {
        sort_by: "vote_average.asc",
      },
    };

    return MAP_RATING_PAYLOAD[filters.rating];
  }, [filters.rating]);

  /**
   * Generates the payload for filtering movies by selected genres.
   *
   * @returns The genre filter payload or `undefined` if no genres are selected.
   */
  const genresPayload = useMemo(() => {
    if (isEmpty(filters.genres)) return;

    const genreIds = filters.genres.map((item) => item.id);
    return { with_genres: genreIds.join(",") };
  }, [filters.genres]);

  /**
   * Generates the payload for filtering movies by selected decade.
   *
   * @returns The decade filter payload or `undefined` if no decade is selected.
   */
  const decadePayload = useMemo(() => {
    if (!filters.decade.length) return;

    const year = toInteger(filters.decade.slice(0, 4));

    return {
      primary_release_date_gte: `${year}-01-01`,
      primary_release_date_lte: `${year + 9}-12-31`,
    };
  }, [filters.decade]);

  /**
   * Generates the payload for filtering movies by selected year.
   *
   * @returns The year filter payload or `undefined` if no year is selected.
   */
  const yearPayload = useMemo(() => {
    if (!filters.year.length) return;

    return {
      primary_release_date_gte: "",
      primary_release_date_lte: "",
      primary_release_year: filters.year,
    };
  }, [filters.year]);

  /**
   * Combines all dynamically generated filters (popularity, rating, genres, decade, and year) into a single payload.
   *
   * @returns The final payload used for browsing movies with all active filters applied.
   */
  const browseMoviesPayload = useMemo(
    () => ({
      ...popularityPayload,
      ...ratingPayload,
      ...genresPayload,
      ...decadePayload,
      ...yearPayload,
    }),
    [
      popularityPayload,
      ratingPayload,
      genresPayload,
      decadePayload,
      yearPayload,
    ],
  );

  /**
   * A reference to the modal component for applying filters used in small screens.
   */
  const filterModalComponentRef = useRef<ModalComponentFunctions>(null);

  /**
   * Checks whether any filters have been applied (i.e., filters differ from appliedFilters).
   *
   * @returns `true` if filters have been applied, `false` otherwise.
   */
  const isApplyFilters = useMemo(
    () => !isEqual(filters, appliedFilters),
    [filters, appliedFilters],
  );

  /**
   * Checks whether all applied filters are empty.
   *
   * @returns `true` if all applied filters are empty, `false` otherwise.
   */
  const isAppliedFiltersEmpty = useMemo(
    () =>
      every(
        appliedFilters,
        (value) => value === "" || (isArray(value) && isEmpty(value)),
      ),
    [appliedFilters],
  );

  return {
    decades,
    yearsInDecade,
    popularityOptions,
    browseMoviesPayload,
    filterModalComponentRef,
    isApplyFilters,
    isAppliedFiltersEmpty,
  };
}

/**
 * Custom hook that provides actions for managing filters, including showing or hiding filter buttons,
 * applying, clearing filters, and updating filter values.
 *
 * @returns An object containing the following methods:
 * - `onHideButton`: A callback that determines if the filter button should be hidden based on the current filters.
 * - `onClearFilters`: A callback to clear all applied filters.
 * - `onClickFilterItem`: A callback to apply a selected filter item to the current filters.
 * - `onClickFilterButton`: A callback to either apply or clear filters based on the current state.
 */
function useActions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { browseMoviesPayload, isApplyFilters, isAppliedFiltersEmpty } =
    useVariables();

  const {
    filters,
    setFilters,
    setAppliedFilters,
    setPayload,
    clearFilters,
    clearAppliedFilters,
  } = useBrowseMovieStore();

  /**
   * Determines if the filter button should be hidden.
   * The button will be hidden if:
   * - There are no filters in the `browseMoviesPayload`.
   * - All filters are applied and empty.
   *
   * @param query - The current query string.
   * @returns `true` if the button should be hidden, otherwise `false`.
   */
  const onHideButton = useCallback(
    (query: string) =>
      !!query.length ||
      (isEmpty(browseMoviesPayload) && isAppliedFiltersEmpty),
    [browseMoviesPayload, isAppliedFiltersEmpty],
  );

  /**
   * Applies a selected filter item to the current filters.
   * - If the item is a genre, it updates the genre filter.
   * - Otherwise, it updates the standard filter item.
   * - If the location path is not "browse", it will navigate to "/browse".
   *
   * @param itemKey - The key of the filter to be updated.
   * @param item - The filter value or genre item to be applied.
   */
  const onClickFilterItem = useCallback(
    (itemKey: keyof BrowseMovieFilters, item: string | GenreItem) => {
      if (location.pathname !== "browse") {
        navigate("/browse");
      }

      const data = isObject(item)
        ? updateGenreFilterItem(filters, item)
        : updateFilterItem(filters, itemKey, item);

      setFilters(data);
    },
    [location, filters, navigate, setFilters],
  );

  /**
   * Clears all applied filters and resets the filter payload.
   * This will also clear both the `filters` and `appliedFilters` from the state.
   */
  const onClearFilters = useCallback(() => {
    setPayload({});
    clearFilters();
    clearAppliedFilters();
  }, [setPayload, clearFilters, clearAppliedFilters]);

  /**
   * Applies or clears filters based on whether the filters have been changed.
   * - If filters have been applied, it saves the current `filters` and updates the `browseMoviesPayload`.
   * - If no filters are applied, it clears all filters and resets the payload.
   */
  const onClickFilterButton = useCallback(() => {
    if (isApplyFilters) {
      setAppliedFilters(filters);
      setPayload(browseMoviesPayload);
      return;
    }

    onClearFilters();
  }, [
    isApplyFilters,
    filters,
    browseMoviesPayload,
    setAppliedFilters,
    setPayload,
    onClearFilters,
  ]);

  return {
    onHideButton,
    onClearFilters,
    onClickFilterItem,
    onClickFilterButton,
  };
}

export const BrowseMovieHooks = {
  useVariables,
  useActions,
};
