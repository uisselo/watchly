import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isArray, isEmpty, isEqual, omitBy } from "lodash-es";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  type BrowseMoviesPayloadDisplay,
  FilterComponent,
  FilterModalComponent,
  MovieItemComponent,
  useBrowseMovies,
  useBrowseMoviesQueries,
  useBrowseMoviesStore,
} from "@Modules";
import {
  ButtonComponent,
  ModalComponent,
  type ModalComponentFunctions,
  SearchBoxComponent,
} from "@GlobalComponents";
import { formatDate } from "@Utilities";

function BrowseMoviesPage() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const filterModalComponentRef = useRef<ModalComponentFunctions>(null);

  const [payload, setPayload] = useState({});
  const [payloadDisplay, setPayloadDisplay] = useState({});
  const [query, setQuery] = useState("");
  const [queryDisplay, setQueryDisplay] = useState("");

  const { browseMoviesPayload } = useBrowseMovies();
  const { browseMovieResults } = useBrowseMoviesQueries(query, payload);
  const {
    payload: payloadStore,
    searchResults,
    setSearchResults,
    clearPayload,
  } = useBrowseMoviesStore();

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *    Runs only once on navigation from a different path.
   */
  useEffect(() => {
    setPayload(browseMoviesPayload);
  }, []);

  useEffect(() => {
    if (queryDisplay.length) clearPayload();
  }, [queryDisplay, clearPayload]);

  const isApply = useMemo(
    () => !isEqual(payload, browseMoviesPayload),
    [payload, browseMoviesPayload],
  );

  const showButton = useMemo(
    () => !queryDisplay.length && !isEmpty(browseMoviesPayload),
    [queryDisplay, browseMoviesPayload],
  );

  const payloadDisplayData = useMemo(
    () =>
      omitBy(
        payloadDisplay,
        (value) => value === "" || (isArray(value) && isEmpty(value)),
      ) as BrowseMoviesPayloadDisplay,
    [payloadDisplay],
  );

  const onClickSearchBoxIcon = useCallback(() => {
    const isSearch = query === queryDisplay && searchResults;

    if (isSearch) {
      setQueryDisplay("");
      setSearchResults([]);
    }

    setQuery(isSearch ? "" : queryDisplay);
  }, [query, queryDisplay, searchResults, setSearchResults]);

  const onClickFilterButton = useCallback(() => {
    if (!isApply) clearPayload();

    setPayload(isApply ? browseMoviesPayload : {});
    setPayloadDisplay(isApply ? payloadStore : {});

    if (isSmallScreen) filterModalComponentRef.current?.close();
  }, [isApply, browseMoviesPayload, isSmallScreen, payloadStore, clearPayload]);

  if (!browseMovieResults) return;

  return (
    <div className="grid-container">
      <div className="flex flex-col col-span-4 gap-4 md:col-span-5 lg:col-span-4 lg:gap-5">
        <h1>Browse Movies</h1>
        <div className="space-y-3">
          <SearchBoxComponent
            value={queryDisplay}
            onChange={(e) => setQueryDisplay(e.target.value)}
          >
            {queryDisplay && (
              <SearchBoxComponent.ButtonIcon
                isSearch={query !== queryDisplay}
                onClick={onClickSearchBoxIcon}
              />
            )}
          </SearchBoxComponent>
          {isSmallScreen && (
            <ButtonComponent
              size="sm"
              text="Filter Movies"
              icon={FunnelIcon}
              iconPosition="trailing"
              isFull
              onClick={() => filterModalComponentRef.current?.open()}
            />
          )}
        </div>
        <FilterComponent
          isApply={isApply}
          className="hidden md:block"
          {...(showButton && { onClick: onClickFilterButton })}
        />
      </div>
      <div className="flex flex-col col-span-4 gap-4 md:col-span-7 lg:col-span-8 lg:gap-5">
        {!isEmpty(searchResults) ? (
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
        ) : (
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-5">
            {browseMovieResults.map((item) => (
              <MovieItemComponent key={item.id} data={item}>
                <MovieItemComponent.Image />
                <MovieItemComponent.Caption />
              </MovieItemComponent>
            ))}
          </div>
        )}
      </div>
      <ModalComponent
        ref={filterModalComponentRef}
        className="z-50 bg-gray-800"
      >
        <FilterModalComponent
          isApply={isApply || isEmpty(browseMoviesPayload)}
          onClick={onClickFilterButton}
          onClose={() => filterModalComponentRef.current?.close()}
        />
      </ModalComponent>
    </div>
  );
}

export default BrowseMoviesPage;
