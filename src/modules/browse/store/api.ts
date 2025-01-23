import { APIService } from "@API";
import type { MovieListResponse } from "../../shared";

function getSearchResults(query: string) {
  const response = APIService.get<MovieListResponse>("search/movie", {
    query,
  });

  return response;
}

export const BrowseApi = { getSearchResults };
