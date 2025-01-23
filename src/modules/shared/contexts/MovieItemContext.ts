import { createContext, useContext } from "react";
import type { MovieItem } from "../store";

type MovieItemContextData = { data: MovieItem };

/**
 * Context to provide `MovieItem` data to components.
 * This context should be used with the `MovieItemContext.Provider`.
 */
const MovieItemContext = createContext<MovieItemContextData>(
  {} as MovieItemContextData,
);

export default MovieItemContext;

/**
 * Hook to access the `MovieItemContext`.
 *
 * @throws Will throw an error if used outside of a `MovieItemContext.Provider`.
 */
export function useProductItemContext() {
  const context = useContext(MovieItemContext);

  if (!context) {
    throw new Error(
      "useMovieItemContext must be used within the MovieItemContext.Provider.",
    );
  }

  return context;
}
