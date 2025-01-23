import { APIService } from "@API";
import type { MovieListResponse } from "../../shared";
import type { CelebrityListResponse } from "./types";

function getPopularMovies() {
  const response = APIService.get<MovieListResponse>("movie/popular");
  return response;
}

function getTopRatedMovies() {
  const response = APIService.get<MovieListResponse>("movie/top_rated");
  return response;
}

function getPopularCelebrities() {
  const response = APIService.get<CelebrityListResponse>("person/popular");
  return response;
}

export const LandingApi = {
  getPopularMovies,
  getTopRatedMovies,
  getPopularCelebrities,
};
