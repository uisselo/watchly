import { useQuery } from "react-query";
import { LandingApi } from "./api";
import {
  getImageUrl,
  updateDataDisplayLength,
  updateMovieData,
} from "../../shared";

/**
 * Custom hook for fetching and processing data for the Landing Page.
 *
 * @param celebritiesDataLength The number of celebrities to display.
 */
export function useLandingQueries(celebritiesDataLength = 0) {
  const { data: popularMovies } = useQuery(
    "popular_movies",
    () => LandingApi.getPopularMovies(),
    {
      select: (data) => updateMovieData(data.results),
    },
  );

  const { data: topRatedMovies } = useQuery(
    "top_rated_movies",
    () => LandingApi.getTopRatedMovies(),
    {
      select: (data) => {
        const finalData = updateDataDisplayLength(data.results, 4);
        return updateMovieData(finalData);
      },
    },
  );

  const { data: popularCelebrities } = useQuery(
    "popular_celebrities",
    () => LandingApi.getPopularCelebrities(),
    {
      select: (data) => {
        const updatedDataLength = updateDataDisplayLength(
          data.results,
          celebritiesDataLength,
        );

        const updatedData = updatedDataLength.map((item) => ({
          ...item,
          profile_url: getImageUrl(item.profile_path),
        }));

        return updatedData;
      },
    },
  );

  return {
    popularMovies,
    topRatedMovies,
    popularCelebrities,
  };
}
