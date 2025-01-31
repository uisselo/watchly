import { useQueries, useQuery } from "react-query";
import { formatDate } from "@Utilities";
import { type MovieListResponse, updateMovieData } from "../../shared";
import { BrowseMovieApi } from "./api";
import { useBrowseMovieStore } from "./store";

/**
 * A custom hook for fetching movie data based on search queries and browsing filters.
 *
 * @param query - The search query string used to fetch movie search results.
 * @param browseMoviePayload - An object containing filter parameters for browsing movies.
 *
 * @returns An object containing:
 *  - `isSearchResultsSuccess`: Boolean indicating if search results were successfully fetched.
 *  - `firstReleaseYear`: The first recorded release year from the database.
 *  - `latestReleaseYear`: The most recent release year from the database.
 *  - `browseMovieResults`: A list of movies based on the browsing filters.
 */
export function useBrowseMovieQueries(
  query = "",
  browseMoviePayload = {},
) {
  const { setSearchResults } = useBrowseMovieStore();

  const { isSuccess: isSearchResultsSuccess } = useQuery(
    ["search_movie", query],
    () => BrowseMovieApi.getSearchResults(query),
    {
      enabled: !!query.length,
      onSuccess: (data) => {
        setSearchResults(updateMovieData(data.results));
      },
    },
  );

  const releaseYears = useQueries([
    {
      queryKey: "first_release_year",
      queryFn: () =>
        BrowseMovieApi.getMovies({ sort_by: "primary_release_date.asc" }),
      select: (data: MovieListResponse) =>
        formatDate(data.results[0].release_date, "YYYY"),
    },
    {
      queryKey: "latest_release_year",
      queryFn: () =>
        BrowseMovieApi.getMovies({ sort_by: "primary_release_date.desc" }),
      select: (data: MovieListResponse) =>
        formatDate(data.results[0].release_date, "YYYY"),
    },
  ]);

  const { data: browseMovieResults } = useQuery(
    ["browse_movie", browseMoviePayload],
    () => BrowseMovieApi.getMovies(browseMoviePayload),
    {
      enabled: !!browseMoviePayload,
      select: (data) => updateMovieData(data.results),
    },
  );

  return {
    isSearchResultsSuccess,
    firstReleaseYear: releaseYears[0].data,
    latestReleaseYear: releaseYears[1].data,
    browseMovieResults,
  };
}
