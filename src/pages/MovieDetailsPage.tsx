import { useMemo, useState } from "react";
import { useParams } from "react-router";
import clsx from "clsx";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  MovieDetailsContext,
  updateDataDisplayLength,
  useMovieDetailsContext,
  useMovieDetailsQueries,
  useSharedQueries,
} from "@Modules";
import { cn, formatDate } from "@Utilities";

function MovieDetailsPage() {
  const { id } = useParams();
  const { movieDetails } = useMovieDetailsQueries(id);

  if (!movieDetails) return null;

  return (
    <MovieDetailsContext.Provider value={{ movieDetails }}>
      <div className="grid-container">
        <div className="col-span-4 grid-container md:col-span-12 lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-10">
          <Poster />
          <Details />
          <MoreDetails />
        </div>
        <TabContent />
      </div>
    </MovieDetailsContext.Provider>
  );
}

export default MovieDetailsPage;

function Poster() {
  const { movieDetails } = useMovieDetailsContext();

  const hasNoImage = useMemo(
    () => !movieDetails?.backdrop_path && !movieDetails?.poster_path,
    [movieDetails],
  );

  return (
    <div
      className={cn(
        "col-span-2 md:col-span-4 lg:col-span-3 flex items-center justify-center rounded aspect-[2/3] overflow-hidden",
        { "border-2 border-gray-400": hasNoImage },
      )}
    >
      <img
        src={movieDetails.poster_url}
        alt={`${movieDetails.title} Poster`}
        className="object-cover size-full"
      />
    </div>
  );
}

function Details() {
  const { movieDetails } = useMovieDetailsContext();

  return (
    <>
      <div className="flex flex-col justify-end col-span-4 gap-3 md:col-span-8 lg:col-span-7">
        <div className="space-y-0.5">
          <h1>{movieDetails.title}</h1>
          <p className="font-medium">
            {formatDate(movieDetails.release_date, "YYYY")}
          </p>
        </div>
        <p className="font-medium">{movieDetails.tagline}</p>
      </div>
      <p className="col-span-4 md:col-span-12 md:col-span-10">
        {movieDetails.overview}
      </p>
    </>
  );
}

function MoreDetails() {
  const { languageList } = useSharedQueries();
  const { movieDetails } = useMovieDetailsContext();

  const director = useMemo(
    () =>
      movieDetails.credits.crew.find((item) => item.job === "Director")
        ?.name,
    [movieDetails.credits],
  );

  const originalLanguage = useMemo(
    () =>
      languageList?.find(
        (item) => item.iso_639_1 === movieDetails.original_language,
      )?.english_name,
    [languageList, movieDetails.original_language],
  );

  return (
    <div className="col-span-4 md:col-span-12 md:col-span-10">
      <div className="flex flex-col bg-gray-700 border border-gray-600 divide-y divide-gray-600 md:divide-x md:divide-y-0 rounded-xl md:flex-row">
        <div className="w-full p-3 space-y-1 md:p-4">
          <p>Directed by</p>
          <p className="font-bold">{director}</p>
        </div>
        <div className="w-full p-3 space-y-1 md:p-4">
          <p>Original Language</p>
          {originalLanguage && (
            <p className="font-bold">{originalLanguage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TabContent() {
  const { movieDetails } = useMovieDetailsContext();

  const TAB_ITEMS = ["Cast", "Crew", "Genres"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const castDisplay = useMemo(
    () => updateDataDisplayLength(movieDetails.credits.cast, 5),
    [movieDetails.credits.cast],
  );

  const crewDisplay = useMemo(
    () => updateDataDisplayLength(movieDetails.credits.crew, 5),
    [movieDetails.credits.crew],
  );

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="col-span-4 grid-container md:col-span-12 lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-10"
    >
      <TabList className="flex col-span-4 md:flex-col lg:col-span-3">
        {TAB_ITEMS.map((item, index) => {
          const selected = selectedIndex === index;

          return (
            <Tab
              key={item}
              className={clsx(
                "relative w-full p-3 bg-gray-800 focus:outline-none flex justify-center md:justify-start",
                { "border-b border-gray-600": !selected },
              )}
            >
              {selected && (
                <div className="absolute inset-x-0 bottom-0 h-[1px] custom-bg-gradient z-20" />
              )}
              <div
                className={clsx({
                  "text-transparent bg-clip-text custom-bg-gradient w-max ":
                    selected,
                })}
              >
                <p className="font-semibold md:text-left">{item}</p>
              </div>
            </Tab>
          );
        })}
      </TabList>
      <TabPanels className="col-span-4 md:col-span-8 lg:col-span-7">
        <Panel
          data={castDisplay}
          mainTextKey="name"
          subTextKey="character"
        />
        <Panel data={crewDisplay} mainTextKey="name" subTextKey="job" />
        <Panel data={movieDetails.genres} mainTextKey="name" />
      </TabPanels>
    </TabGroup>
  );
}

function Panel<T extends Record<string, unknown>>(props: {
  data: T[];
  mainTextKey: keyof T;
  subTextKey?: keyof T;
}) {
  const { data, mainTextKey, subTextKey } = props;

  return (
    <TabPanel>
      {data.map((item, index) => (
        <div
          key={String(index)}
          className="flex justify-between p-3 border-b border-gray-600"
        >
          {subTextKey && (
            <p className="font-bold">{String(item[subTextKey])}</p>
          )}
          <p>{String(item[mainTextKey])}</p>
        </div>
      ))}
    </TabPanel>
  );
}
