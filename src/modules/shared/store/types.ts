export type Pagination = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieItem = {
  adult: boolean;
  backdrop_path: string;
  backdrop_url: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  poster_url: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieListResponse = Pagination & {
  dates?: {
    maximum: string;
    minimum: string;
  };
  results: MovieItem[];
};

export type GenreItem = {
  id: number;
  name: string;
};

export type LanguageItem = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
