import { APIService } from "@API";
import type { MovieListResponse } from "../../shared";
import type { BrowseMoviesPayload } from "./types";
import { identity, pickBy } from "lodash-es";

function getSearchResults(query: string) {
  const response = APIService.get<MovieListResponse>("search/movie", {
    query,
  });

  return response;
}

function getMovies(payload: BrowseMoviesPayload) {
  const {
    primary_release_date_gte,
    primary_release_date_lte,
    vote_count_gte,
    ...rest
  } = payload;

  const transformedPayload = {
    "primary_release_date.gte": primary_release_date_gte,
    "primary_release_date.lte": primary_release_date_lte,
    "vote_count.gte": vote_count_gte,
    ...rest,
  };

  const finalPayload = pickBy(transformedPayload, identity);

  const response = APIService.get<MovieListResponse>(
    "discover/movie",
    finalPayload,
  );

  return response;
}

export const BrowseMoviesApi = { getSearchResults, getMovies };
