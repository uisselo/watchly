import { useQueries, useQuery } from "react-query";
import { formatDate } from "@Utilities";
import { updateMovieData, type MovieListResponse } from "../../shared";
import { BrowseMoviesApi } from "./api";
import useBrowseMoviesStore from "./store";

/**
 * Custom hook for fetching and processing data for the Browse Movies Page.
 *
 * @param query A search term to filter the movie results.
 */
export function useBrowseMoviesQueries(query = "", browseMoviesPayload = {}) {
  const { setSearchResults } = useBrowseMoviesStore();

  useQuery(
    ["search_movie", query],
    () => BrowseMoviesApi.getSearchResults(query),
    {
      enabled: !!query.length,
      onSuccess: (data) => {
        setSearchResults(updateMovieData(data.results));
      },
    },
  );

  /**
   * Get first and latest release year for movies, which will be used for decades data.
   */
  const releaseYears = useQueries([
    {
      queryKey: "first_release_year",
      queryFn: () =>
        BrowseMoviesApi.getMovies({ sort_by: "primary_release_date.asc" }),
      select: (data: MovieListResponse) =>
        formatDate(data.results[0].release_date, "YYYY"),
    },
    {
      queryKey: "latest_release_year",
      queryFn: () =>
        BrowseMoviesApi.getMovies({ sort_by: "primary_release_date.desc" }),
      select: (data: MovieListResponse) =>
        formatDate(data.results[0].release_date, "YYYY"),
    },
  ]);

  const { data: browseMovieResults } = useQuery(
    ["browse_movies", browseMoviesPayload],
    () => BrowseMoviesApi.getMovies(browseMoviesPayload),
    {
      enabled: !!browseMoviesPayload,
      select: (data) => updateMovieData(data.results),
    },
  );

  return {
    firstReleaseYear: releaseYears[0].data,
    latestReleaseYear: releaseYears[1].data,
    browseMovieResults,
  };
}
