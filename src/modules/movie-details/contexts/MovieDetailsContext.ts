import { createContext, useContext } from "react";
import type { MovieDetailsResponse } from "../store";

type MovieDetailsContextData = {
  movieDetails: MovieDetailsResponse;
};

const MovieDetailsContext = createContext<MovieDetailsContextData>(
  {} as MovieDetailsContextData,
);

export default MovieDetailsContext;

export function useMovieDetailsContext() {
  const context = useContext(MovieDetailsContext);

  if (!context) {
    throw new Error(
      "useMovieDetailsContext must be used within the MovieDetailsContext.Provider.",
    );
  }

  return context;
}
