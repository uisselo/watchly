import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { floor, isEmpty, isObject, map, range, toInteger } from "lodash-es";
import moment from "moment";
import { formatDate } from "@Utilities";
import type { GenreItem } from "../shared";
import { POPULARITY_OPTIONS } from "./constants";
import {
  type BrowseMoviesPayload,
  type BrowseMoviesPayloadDisplay,
  useBrowseMoviesQueries,
  useBrowseMoviesStore,
} from "./store";
import { getRange } from "./utils";

/**
 * Custom hook to manage the state and payload for browsing movies.
 * It provides the dynamic payload for filtering movies by various criteria such as popularity, rating, genre, decade, and year.
 * Also handles logic for updating filters in the store.
 *
 * @returns The following properties:
 * - `payload`: The current filter state for browsing movies.
 * - `decades`: Array of available decades (e.g., "1990s", "2000s") based on the first and latest movie release years.
 * - `yearsInDecade`: List of years within the selected decade.
 * - `popularityOptions`: List of available popularity filter options, dynamically updated based on year or decade.
 * - `browseMoviesPayload`: The combined payload including all active filters for browsing movies.
 * - `onClickFilterItem`: A callback to update the filter state when a filter item is selected (e.g., genre, year, popularity).
 */
export function useBrowseMovies() {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstReleaseYear, latestReleaseYear } = useBrowseMoviesQueries();
  const { payload, updatePayload, updateGenres } = useBrowseMoviesStore();

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
    if (!payload.decade) return;

    const decade = toInteger(payload.decade.slice(0, -1));
    const years = range(decade, decade + 10);

    return map(years, String);
  }, [payload.decade]);

  /**
   * Generates a list of popularity filter options, dynamically including 'Most popular' and 'Least popular' based on year or decade.
   *
   * @returns An array of popularity options, including the dynamic `Most popular` and `Least popular` options if a year or decade is selected.
   */
  const popularityOptions = useMemo(() => {
    const value = payload.year || payload.decade;
    const mostPopularText = `Most popular: ${value}`;
    const leastPopularText = `Least popular: ${value}`;

    return value
      ? POPULARITY_OPTIONS.concat(mostPopularText, leastPopularText)
      : POPULARITY_OPTIONS;
  }, [payload.decade, payload.year]);

  /**
   * Generates the payload for filtering movies by popularity.
   *
   * @returns The dynamically generated popularity filter payload, including sorting and date range adjustments.
   */
  const popularityPayload = useMemo(() => {
    if (!payload.popularity.length) return;

    const MAP_POPULARITY_PAYLOAD: Record<string, BrowseMoviesPayload> = {
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
      ...MAP_POPULARITY_PAYLOAD[payload.popularity],
      sort_by:
        payload.popularity.split(" ")[0] === "Least"
          ? "popularity.asc"
          : "popularity.desc",
    };
  }, [payload.popularity]);

  /**
   * Generates the payload for filtering movies by rating (highest or lowest).
   *
   * @returns The dynamically generated rating filter payload.
   */
  const ratingPayload = useMemo(() => {
    if (!payload.rating.length) return;

    const MAP_RATING_PAYLOAD: Record<string, BrowseMoviesPayload> = {
      "Highest first": {
        sort_by: "vote_average.desc",
        vote_count_gte: 1000,
      },
      "Lowest first": {
        sort_by: "vote_average.asc",
      },
    };

    return MAP_RATING_PAYLOAD[payload.rating];
  }, [payload.rating]);

  /**
   * Generates the payload for filtering movies by selected genres.
   *
   * @returns The genre filter payload or `undefined` if no genres are selected.
   */
  const genresPayload = useMemo(() => {
    if (isEmpty(payload.genres)) return;

    const genreIds = payload.genres.map((item) => item.id);
    return { with_genres: genreIds.join(",") };
  }, [payload.genres]);

  /**
   * Generates the payload for filtering movies by selected decade.
   *
   * @returns The decade filter payload or `undefined` if no decade is selected.
   */
  const decadePayload = useMemo(() => {
    if (!payload.decade.length) return;

    const year = toInteger(payload.decade.slice(0, 4));

    return {
      primary_release_date_gte: `${year}-01-01`,
      primary_release_date_lte: `${year + 9}-12-31`,
    };
  }, [payload.decade]);

  /**
   * Generates the payload for filtering movies by selected year.
   *
   * @returns The year filter payload or `undefined` if no year is selected.
   */
  const yearPayload = useMemo(() => {
    if (!payload.year.length) return;

    return {
      primary_release_date_gte: "",
      primary_release_date_lte: "",
      primary_release_year: payload.year,
    };
  }, [payload.year]);

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
   * Handles the selection of filter items (e.g., genre, year) and updates the filter state accordingly.
   *
   * @param item - The selected filter item (either a genre item or a string).
   * @param payloadKey - The key representing the filter type (e.g., "popularity", "genre").
   */
  const onClickFilterItem = useCallback(
    (
      item: string | GenreItem,
      payloadKey: keyof BrowseMoviesPayloadDisplay,
    ) => {
      if (location.pathname !== "browse") {
        navigate("/browse");
      }

      isObject(item) ? updateGenres(item) : updatePayload(payloadKey, item);
    },
    [location, navigate, updateGenres, updatePayload],
  );

  return {
    payload,
    decades,
    yearsInDecade,
    popularityOptions,
    browseMoviesPayload,
    onClickFilterItem,
  };
}
