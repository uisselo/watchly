import { APIService } from "@API";
import type { LanguageItem, GenreItem } from "./types";

function getGenreList() {
  const response = APIService.get<{ genres: GenreItem[] }>("genre/movie/list");
  return response;
}

function getLanguages() {
  const response = APIService.get<LanguageItem[]>("configuration/languages");
  return response;
}

export const SharedApi = { getGenreList, getLanguages };
