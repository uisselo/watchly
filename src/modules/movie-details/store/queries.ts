import { useQuery } from "react-query";
import { APIService } from "@API";
import { getImageUrl } from "../../shared";
import type { MovieDetailsResponse } from "./types";

/**
 * Custom hook that fetches movie details from an API based on the given movie ID.
 * It also appends additional movie credits and generates URLs for the backdrop and poster images.
 *
 * @param id The unique ID of the movie to fetch details for.
 * @returns The movie details, including backdrop and poster image URLs.
 */
export function useMovieDetailsQueries(id = "") {
  const { data: movieDetails } = useQuery(
    ["movie_details", id],
    () =>
      APIService.get<MovieDetailsResponse>(`movie/${id}`, {
        append_to_response: "credits",
      }),
    {
      enabled: !!id,
      select: (data) => {
        const updatedData = {
          ...data,
          backdrop_url: getImageUrl(data.backdrop_path),
          poster_url: getImageUrl(data.poster_path),
        };
        return updatedData;
      },
    },
  );

  return {
    movieDetails,
  };
}
