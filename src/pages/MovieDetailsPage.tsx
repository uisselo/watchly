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
  type MovieDetailsResponse,
  updateDataDisplayLength,
  useMovieDetailsQueries,
  useSharedQueries,
} from "@Modules";
import { cn, formatDate } from "@Utilities";

function MovieDetailsPage() {
  const { id } = useParams();
  const { movieDetails } = useMovieDetailsQueries(id);
  const { languageList } = useSharedQueries();

  const hasNoImage = useMemo(
    () => !movieDetails?.backdrop_path && !movieDetails?.poster_path,
    [movieDetails],
  );

  const director = useMemo(
    () =>
      movieDetails?.credits.crew.find((item) => item.job === "Director")
        ?.name,
    [movieDetails],
  );

  const originalLanguage = useMemo(
    () =>
      languageList?.find(
        (item) => item.iso_639_1 === movieDetails?.original_language,
      )?.english_name,
    [languageList, movieDetails],
  );

  if (!movieDetails) return null;

  return (
    <div className="grid-container">
      <div className="col-span-4 grid-container md:col-span-12 lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-10">
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
      </div>
      <TabContent data={movieDetails} />
    </div>
  );
}

export default MovieDetailsPage;

function TabContent({ data }: { data: MovieDetailsResponse }) {
  const TAB_ITEMS = ["Cast", "Crew", "Genres"];

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!data) return null;

  const castDisplay = updateDataDisplayLength(data.credits.cast, 5);
  const crewDisplay = updateDataDisplayLength(data.credits.crew, 5);

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="col-span-4 grid-container md:col-span-12 lg:col-span-10 lg:col-start-2 lg:grid lg:grid-cols-10"
    >
      <TabList className="flex col-span-4 md:gap-0.5 md:flex-col lg:col-span-3">
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
                <div className="absolute inset-x-0 top-0 -bottom-0.5 custom-bg-gradient -z-20" />
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
        <TabPanel className="space-y-0.5">
          {castDisplay.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-3 border-b border-gray-600"
            >
              <p className="font-bold">{item.character}</p>
              <p>{item.name}</p>
            </div>
          ))}
        </TabPanel>
        <TabPanel className="space-y-0.5">
          {crewDisplay.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-3 border-b border-gray-600"
            >
              <p className="font-bold">{item.job}</p>
              <p>{item.name}</p>
            </div>
          ))}
        </TabPanel>
        <TabPanel className="space-y-0.5">
          {data.genres.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-3 border-b border-gray-600"
            >
              <p>{item.name}</p>
            </div>
          ))}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
