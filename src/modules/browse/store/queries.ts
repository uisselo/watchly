import { useQuery } from "react-query";
import { BrowseApi } from "./api";

/**
 * Custom hook for fetching and processing data for the Browse Movies Page.
 *
 * @param query A search term to filter the movie results.
 */
export function useBrowseQueries(query = "") {
  const { data: searchMovieData } = useQuery(
    "search_movie",
    () => BrowseApi.getSearchResults(query),
    { enabled: !!query.length },
  );

  return {
    searchResults: searchMovieData?.results,
  };
}
