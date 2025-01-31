import type { GenreItem, MovieItem } from "../../shared";

export type BrowseMovieSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "vote_average.asc"
  | "vote_average.desc";

export type BrowseMoviePayload = Partial<{
  sort_by: BrowseMovieSortBy;
  primary_release_year: string;
  primary_release_date_gte: string;
  primary_release_date_lte: string;
  vote_count_gte: number;
  with_genres: string;
}>;

export type BrowseMovieFilters = {
  popularity: string;
  rating: string;
  genres: GenreItem[];
  decade: string;
  year: string;
};

export type BrowseMovieState = {
  filters: BrowseMovieFilters;
  appliedFilters: BrowseMovieFilters;
  appliedQuery: string;
  searchResults: MovieItem[];
  payload: BrowseMoviePayload;
  clearFilters: () => void;
  clearAppliedFilters: () => void;
  setFilters: (data: BrowseMovieFilters) => void;
  setAppliedFilters: (data: BrowseMovieFilters) => void;
  setAppliedQuery: (data: string) => void;
  setSearchResults: (data: MovieItem[]) => void;
  setPayload: (data: BrowseMoviePayload) => void;
};
