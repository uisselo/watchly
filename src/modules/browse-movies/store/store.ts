import { create } from "zustand";
import type { BrowseMoviesState } from "./types";

const useBrowseMoviesStore = create<BrowseMoviesState>((set) => ({
  payload: {
    popularity: "",
    rating: "",
    genres: [],
    decade: "",
    year: "",
  },
  searchResults: [],
  clearPayload: () =>
    set({
      payload: {
        popularity: "",
        rating: "",
        genres: [],
        decade: "",
        year: "",
      },
    }),
  updatePayload: (key, value) =>
    set(({ payload }) => {
      const isDecadeOrYearSelected = ["decade", "year"].includes(key);
      const isNotMostOrLeast =
        key === "popularity" &&
        !["Most", "Least"].includes(value.split(" ")[0]);

      return {
        payload: {
          ...payload,
          ...(isDecadeOrYearSelected && {
            popularity: `Most popular: ${value}`,
          }),
          ...(isNotMostOrLeast && {
            decade: "",
            year: "",
          }),
          [key]: payload[key] === value ? "" : value,
        },
      };
    }),
  updateGenres: (data) =>
    set(({ payload }) => {
      const updatedGenres = payload.genres.some((g) => g.id === data.id)
        ? payload.genres.filter((g) => g.id !== data.id)
        : [...payload.genres, data];

      return {
        payload: {
          ...payload,
          genres: updatedGenres,
        },
      };
    }),
  setSearchResults: (searchResults) => set({ searchResults }),
}));

export default useBrowseMoviesStore;
