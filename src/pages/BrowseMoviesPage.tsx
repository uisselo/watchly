import { useCallback, useEffect, useMemo, useState } from "react";
import { isArray, isEmpty, map, omitBy } from "lodash-es";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  BrowseMovieHooks,
  FilterItemDisplayComponent,
  FilterModalComponent,
  FilterComponent,
  MovieItemComponent,
  useBrowseMovieQueries,
  useBrowseMovieStore,
} from "@Modules";
import {
  ButtonComponent,
  ModalComponent,
  SearchBoxComponent,
} from "@GlobalComponents";
import { cn, formatDate, useBreakpoints } from "@Utilities";

/**
 * Declare BrowseMovieHooks
 */
const { useVariables, useActions } = BrowseMovieHooks;

function BrowseMoviesPage() {
  const { filters, setPayload, setAppliedFilters } = useBrowseMovieStore();
  const { browseMoviesPayload, isAppliedFiltersEmpty } = useVariables();

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *    Runs only once on navigation from a different path.
   */
  useEffect(() => {
    setPayload(browseMoviesPayload);
    setAppliedFilters(filters);
  }, []);

  return (
    <div className="grid-container">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col col-span-4 md:col-span-7 lg:col-span-8",
          isAppliedFiltersEmpty ? "gap-4 lg:gap-5" : "gap-8",
        )}
      >
        <ResultsHeading />
        <ResultsContent />
      </div>
    </div>
  );
}

export default BrowseMoviesPage;

/**
 * Sidebar component for the BrowseMoviesPage, allowing users to search movies,
 * filter movies, and clear filters.
 */
function Sidebar() {
  const { isSmallScreen } = useBreakpoints();
  const {
    appliedQuery,
    setAppliedQuery,
    setSearchResults,
    clearFilters,
    clearAppliedFilters,
  } = useBrowseMovieStore();

  const {
    browseMoviesPayload,
    isApplyFilters,
    isAppliedFiltersEmpty,
    filterModalComponentRef,
  } = useVariables();
  const { onHideButton, onClearFilters, onClickFilterButton } =
    useActions();

  const [query, setQuery] = useState(appliedQuery);

  useEffect(() => {
    if (query.length && isAppliedFiltersEmpty) clearFilters();
  }, [query, isAppliedFiltersEmpty, clearFilters]);

  useEffect(() => {
    if (!isEmpty(browseMoviesPayload)) setQuery("");
  }, [browseMoviesPayload]);

  const isSearch = useMemo(
    () => appliedQuery !== query,
    [appliedQuery, query],
  );

  const handleSearch = useCallback(() => {
    if (!isSearch) {
      setQuery("");
      setSearchResults([]);
    }

    setAppliedQuery(isSearch ? query : "");
    clearAppliedFilters();
  }, [
    isSearch,
    query,
    setSearchResults,
    setAppliedQuery,
    clearAppliedFilters,
  ]);

  return (
    <div className="flex flex-col col-span-4 gap-4 md:col-span-5 lg:col-span-4 lg:gap-5">
      <h1>Browse Movies</h1>
      <div className="space-y-3">
        <SearchBoxComponent
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
          {query && (
            <SearchBoxComponent.ButtonIcon
              isSearch={isSearch}
              onClick={handleSearch}
            />
          )}
        </SearchBoxComponent>
        {isSmallScreen && (
          <div className="flex flex-col items-end gap-3">
            <ButtonComponent
              size="sm"
              text="Filter Movies"
              icon={FunnelIcon}
              iconPosition="trailing"
              isFull
              onClick={() => filterModalComponentRef.current?.open()}
            />
            {!isAppliedFiltersEmpty && (
              <ButtonComponent
                size="sm"
                variant="underline"
                text="Clear Filters"
                onClick={onClearFilters}
              />
            )}
          </div>
        )}
      </div>
      <FilterComponent
        className="hidden md:block"
        hideTitle
        hideButton={onHideButton(query)}
      />
      <ModalComponent
        ref={filterModalComponentRef}
        className="z-50 bg-gray-800"
      >
        <FilterModalComponent
          isApply={isApplyFilters || isEmpty(browseMoviesPayload)}
          onClick={onClickFilterButton}
          onClose={() => filterModalComponentRef.current?.close()}
        />
      </ModalComponent>
    </div>
  );
}

/**
 * Displays the heading for the results section, showing applied filters and search query.
 * If no results are found, it will display an appropriate message.
 */
function ResultsHeading() {
  const { appliedFilters, appliedQuery, searchResults } =
    useBrowseMovieStore();
  const { isSearchResultsSuccess } = useBrowseMovieQueries(appliedQuery);

  const data = useMemo(
    () =>
      omitBy(
        appliedFilters,
        (value, key) =>
          value === "" ||
          (isArray(value) && isEmpty(value)) ||
          ["decade", "year"].includes(key),
      ),
    [appliedFilters],
  );

  if (isEmpty(data) && !appliedQuery.length && !isSearchResultsSuccess)
    return null;

  if (appliedQuery.length)
    return (
      <h1>
        {!isEmpty(searchResults) ? "Search results" : "No result"}
        {` for "${appliedQuery}"`}
      </h1>
    );

  return (
    <div className="space-y-3">
      <h1>Filtered by</h1>
      <div className="flex gap-1 md:gap-1.5">
        {map(data, (value, key) =>
          isArray(value) ? (
            value.map((item) => (
              <FilterItemDisplayComponent
                key={item.id}
                value={item.name}
              />
            ))
          ) : (
            <FilterItemDisplayComponent
              key={key}
              label={key}
              value={value}
            />
          ),
        )}
      </div>
    </div>
  );
}

/**
 * Displays the movie results based on applied filters or search query.
 * It maps over the search results or the filtered movie results and displays them as `MovieItemComponent`.
 */
function ResultsContent() {
  const { appliedQuery, searchResults, payload } = useBrowseMovieStore();
  const { browseMovieResults } = useBrowseMovieQueries("", payload);
  const { isAppliedFiltersEmpty } = useVariables();

  if (isAppliedFiltersEmpty && appliedQuery.length)
    return (
      !isEmpty(searchResults) &&
      searchResults.map((item) => (
        <MovieItemComponent
          key={item.id}
          data={item}
          className="grid grid-cols-4 gap-4 md:grid-cols-7 lg:grid-cols-8 md:gap-5"
        >
          <MovieItemComponent.Image className="col-span-1 md:col-span-2" />
          <div className="col-span-3 space-y-5 md:col-span-5 md:col-span-6">
            <div>
              <h1>{item.title}</h1>
              <p>{formatDate(item.release_date, "YYYY")}</p>
            </div>
            <p className="line-clamp-2 md:line-clamp-3">{item.overview}</p>
          </div>
        </MovieItemComponent>
      ))
    );

  if (!browseMovieResults) return;

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-5">
      {!isEmpty(browseMovieResults) ? (
        browseMovieResults.map((item) => (
          <MovieItemComponent key={item.id} data={item}>
            <MovieItemComponent.Image />
            <MovieItemComponent.Caption />
          </MovieItemComponent>
        ))
      ) : (
        <p>No result</p>
      )}
    </div>
  );
}
