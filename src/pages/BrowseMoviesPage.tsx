import { useCallback, useEffect, useMemo, useState } from "react";
import { isEmpty, isEqual } from "lodash-es";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  FilterComponent,
  MovieItemComponent,
  useBrowseMovies,
  useBrowseMoviesQueries,
  useBrowseMoviesStore,
} from "@Modules";
import { ButtonComponent, SearchBoxComponent } from "@GlobalComponents";
import { useMediaQuery } from "@uidotdev/usehooks";

function BrowseMoviesPage() {
  const isSmallScreen = useMediaQuery("(max-width: 420px)");

  const [query, setQuery] = useState("");
  const [payload, setPayload] = useState({});

  const { browseMoviesPayload } = useBrowseMovies();
  const { browseMovieResults } = useBrowseMoviesQueries("", payload);
  const clearPayload = useBrowseMoviesStore((state) => state.clearPayload);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Runs only once on navigation from a different path.
  useEffect(() => {
    setPayload(browseMoviesPayload);
  }, []);

  const isApply = useMemo(
    () => !isEqual(payload, browseMoviesPayload),
    [payload, browseMoviesPayload],
  );

  const showButton = useMemo(
    () => !query.length && !isEmpty(browseMoviesPayload),
    [query, browseMoviesPayload],
  );

  const onClick = useCallback(() => {
    if (!isApply) clearPayload();

    setPayload(isApply ? browseMoviesPayload : {});
  }, [isApply, browseMoviesPayload, clearPayload]);

  if (!browseMovieResults) return;

  return (
    <div className="grid-container">
      <div className="flex flex-col col-span-4 gap-4 md:col-span-5 lg:col-span-4 lg:gap-5">
        <h1>Browse Movies</h1>
        <div className="space-y-3">
          <SearchBoxComponent onChange={(e) => setQuery(e.target.value)} />
          {isSmallScreen && (
            <ButtonComponent
              size="sm"
              text="Filter Movies"
              icon={FunnelIcon}
              iconPosition="trailing"
              isFull
            />
          )}
        </div>
        <FilterComponent
          isApply={isApply}
          className="hidden md:block"
          {...(showButton && { onClick })}
        />
      </div>
      <div className="grid grid-cols-3 col-span-4 gap-4 md:col-span-7 lg:col-span-8 lg:grid-cols-4 lg:gap-5">
        {browseMovieResults.map((item) => (
          <MovieItemComponent key={item.id} data={item}>
            <MovieItemComponent.Image />
            <MovieItemComponent.Caption />
          </MovieItemComponent>
        ))}
      </div>
    </div>
  );
}

export default BrowseMoviesPage;
