import { create } from "zustand";
import type { BrowseMovieState } from "./types";

/**
 * Zustand store to manage the browsing and filtering of movies.
 */
export const useBrowseMovieStore = create<BrowseMovieState>((set) => ({
  /**
   * The current filters applied to the movie search.
   * Each filter is stored as a key-value pair with the filter's value.
   */
  filters: {
    popularity: "", // Filter by popularity
    rating: "", // Filter by rating
    genres: [], // Filter by genres
    decade: "", // Filter by decade
    year: "", // Filter by year
  },

  /**
   * The filters that have been applied to the movie search.
   * This is separate from `filters` to manage user selections.
   */
  appliedFilters: {
    popularity: "",
    rating: "",
    genres: [],
    decade: "",
    year: "",
  },

  /**
   * The query used for searching movies.
   * This is set when the user enters a search term.
   */
  appliedQuery: "",

  /**
   * The results returned from the movie search.
   * This will contain a list of movies that match the search query and filters.
   */
  searchResults: [],

  /**
   * Any additional data related to the search results, such as metadata.
   */
  payload: {},

  /**
   * Clears all the filters by resetting `filters` to their default state.
   */
  clearFilters: () =>
    set({
      filters: {
        popularity: "",
        rating: "",
        genres: [],
        decade: "",
        year: "",
      },
    }),

  /**
   * Clears all the applied filters, resetting `appliedFilters` to default state.
   */
  clearAppliedFilters: () =>
    set({
      appliedFilters: {
        popularity: "",
        rating: "",
        genres: [],
        decade: "",
        year: "",
      },
    }),

  /**
   * Sets new filters for the movie search.
   * @param filters - The new filters to apply.
   */
  setFilters: (filters) => set({ filters }),

  /**
   * Sets the filters that have been applied to the search.
   * @param appliedFilters - The applied filters.
   */
  setAppliedFilters: (appliedFilters) => set({ appliedFilters }),

  /**
   * Sets the search query.
   * @param appliedQuery - The search query string entered by the user.
   */
  setAppliedQuery: (appliedQuery) => set({ appliedQuery }),

  /**
   * Sets the results from the movie search.
   * @param searchResults - The results to be displayed.
   */
  setSearchResults: (searchResults) => set({ searchResults }),

  /**
   * Sets additional data related to the search results.
   * @param payload - The additional metadata or data to set.
   */
  setPayload: (payload) => set({ payload }),
}));
