import { APIService } from "@API";
import type { GenreItem } from "./types";

function getGenreList() {
  const response = APIService.get<{ genres: GenreItem[] }>("genre/movie/list");
  return response;
}

export const SharedApi = { getGenreList };
