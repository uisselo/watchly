import { useQuery } from "react-query";
import { SharedApi } from "./api";

/**
 * Custom hook for fetching and processing shared data across all pages.
 */
export function useSharedQueries() {
  const { data: genreList } = useQuery(
    "genre",
    () => SharedApi.getGenreList(),
    {
      select: (data) => data.genres,
    },
  );

  return {
    genreList,
  };
}
