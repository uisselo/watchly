import { useEffect } from "react";
import { CarouselComponent } from "@GlobalComponents";
import {
  FilterComponent,
  MovieItemComponent,
  useBrowseMovieStore,
  useLandingQueries,
  useSharedQueries,
} from "@Modules";
import { formatDate, useBreakpoints } from "@Utilities";

function HomePage() {
  const { clearFilters } = useBrowseMovieStore();

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *    Runs only once on navigation from a different path.
   */
  useEffect(() => {
    clearFilters();
  }, []);

  return (
    <div className="grid-container">
      <div className="col-span-4 md:col-span-12">
        <TrendingMoviesSection />
      </div>
      <div className="col-span-4 grid-container md:col-span-12 lg:grid-rows-4 xl:grid-rows-5">
        <div className="col-span-4 md:col-span-6 lg:col-span-8 lg:row-span-2 xl:row-span-3">
          <TopRatedMoviesSection />
        </div>
        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:row-span-5">
          <FilterComponent hideButton />
        </div>
        <div className="h-auto col-span-4 md:col-span-12 lg:col-span-8 lg:row-span-2">
          <CelebritiesSection />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

function TrendingMoviesSection() {
  const { popularMovies } = useLandingQueries();
  const { genreList } = useSharedQueries();

  if (!popularMovies || !genreList) return null;

  return (
    <div className="space-y-4">
      <h1>Trending Movies</h1>
      <CarouselComponent
        items={popularMovies}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: { slidesPerView: 3, spaceBetween: 20 },
          744: { slidesPerView: 2, spaceBetween: 16 },
          0: { slidesPerView: 1, spaceBetween: 16 },
        }}
      >
        {({ item }) => (
          <MovieItemComponent
            key={item.id}
            data={item}
            className="relative"
          >
            <MovieItemComponent.Image
              className="aspect-[3/2]"
              isBackdrop
            />
            <div className="absolute bottom-0 z-10 w-full p-3 space-y-1 rounded-b bg-gray-700/70">
              <div className="flex justify-between">
                <p className="font-semibold">{item.title}</p>
              </div>
              <div className="flex items-center w-full text-xs md:text-md gap-1.5">
                <p>{formatDate(item.release_date, "YYYY")}</p>
                <span>•</span>
                <p className="line-clamp-1">
                  {genreList
                    .filter((g) => item.genre_ids.includes(g.id))
                    .map((g) => g.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </MovieItemComponent>
        )}
      </CarouselComponent>
    </div>
  );
}

function TopRatedMoviesSection() {
  const { topRatedMovies } = useLandingQueries();

  if (!topRatedMovies) return null;

  return (
    <div className="flex flex-col gap-4">
      <h1>Top Rated Movies</h1>
      <div className="grid grid-cols-2 gap-4 h-max lg:grid-cols-4 lg:gap-5">
        {topRatedMovies.map((item) => (
          <MovieItemComponent key={item.id} data={item}>
            <MovieItemComponent.Image />
            <MovieItemComponent.Caption />
          </MovieItemComponent>
        ))}
      </div>
    </div>
  );
}

function CelebritiesSection() {
  const { isSmallScreen } = useBreakpoints();
  const { popularCelebrities } = useLandingQueries(isSmallScreen ? 6 : 5);

  if (!popularCelebrities) return null;

  return (
    <div className="space-y-4">
      <h1>Trending Celebrities</h1>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:gap-5">
        {popularCelebrities.map((item) => (
          <div
            key={item.id}
            className="flex flex-col col-span-1 gap-3 text-center"
          >
            <div className="overflow-hidden rounded aspect-square">
              <img
                src={item.profile_url}
                alt={`${item.name} Profile`}
                className="object-cover size-full"
              />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
