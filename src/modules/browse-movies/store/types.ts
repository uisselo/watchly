import type { GenreItem, MovieItem } from "../../shared";

export type BrowseMoviesSortBy =
  | "popularity.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "vote_average.asc"
  | "vote_average.desc";

export type BrowseMoviesPayload = Partial<{
  sort_by: BrowseMoviesSortBy;
  primary_release_year: string;
  primary_release_date_gte: string;
  primary_release_date_lte: string;
  vote_count_gte: number;
  with_genres: string;
}>;

export type BrowseMoviesPayloadDisplay = {
  popularity: string;
  rating: string;
  genres: GenreItem[];
  decade: string;
  year: string;
};

export type BrowseMoviesState = {
  payload: BrowseMoviesPayloadDisplay;
  searchResults: MovieItem[];
  clearPayload: () => void;
  updatePayload: (key: keyof BrowseMoviesPayloadDisplay, value: string) => void;
  updateGenres: (data: GenreItem) => void;
  setSearchResults: (data: MovieItem[]) => void;
};
