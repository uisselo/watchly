import { useQuery } from "react-query";
import { SharedApi } from "./api";

/**
 * Custom hook for fetching and processing shared data across all pages.
 *
 * @returns The list of genres and languages.
 */
export function useSharedQueries() {
  const { data: genreList } = useQuery(
    "genres",
    () => SharedApi.getGenreList(),
    {
      select: (data) => data.genres,
    },
  );

  const { data: languageList } = useQuery("languages", () =>
    SharedApi.getLanguages(),
  );

  return {
    genreList,
    languageList,
  };
}
