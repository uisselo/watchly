import { useMemo } from "react";
import { Link } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SVGs } from "@Assets";
import { FOOTER_NAV_ITEMS, HEADER_NAV_ITEMS } from "@Config";
import {
  MovieItemComponent,
  updateDataDisplayLength,
  useBrowseMovieQueries,
  useBrowseMovieStore,
} from "@Modules";
import { useBreakpoints } from "@Utilities";
import {
  ButtonComponent,
  ButtonIconComponent,
  SearchBoxComponent,
} from "../common";
import { useHeaderContext } from "./contexts";
import NavItemComponent from "./NavItemComponent";

function NavModalComponent() {
  const { isSearch } = useHeaderContext();
  const Content = isSearch ? SearchContent : NavigationContent;

  return (
    <div className="space-y-8">
      <Header />
      <div className="container grid-container">
        <Content />
        <WatchlyDisclaimer />
      </div>
    </div>
  );
}

export default NavModalComponent;

function Header() {
  const { setSearchResults } = useBrowseMovieStore();
  const { navModalRef, query, setQuery, setIsSearch } = useHeaderContext();

  const onClose = () => {
    setSearchResults([]);
    setIsSearch(false);
    setQuery("");
    navModalRef.current?.close();
  };

  return (
    <header className="container flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <ButtonIconComponent icon={XMarkIcon} onClick={onClose} />
        <Link to="/">
          <img src={SVGs.logo} alt="Watchly Logo" className="w-[120px]" />
        </Link>
      </div>
      <div className="flex">
        <SearchBoxComponent
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="hidden md:flex"
        />
      </div>
    </header>
  );
}

function SearchContent() {
  const { query, setQuery } = useHeaderContext();

  const { searchResults } = useBrowseMovieStore();
  useBrowseMovieQueries(query);

  const data = useMemo(
    () => updateDataDisplayLength(searchResults, 5),
    [searchResults],
  );

  return (
    <div className="flex flex-col col-span-4 gap-4 md:col-span-10 md:col-start-2">
      <SearchBoxComponent
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex md:hidden"
      />
      <div className="flex flex-col divide-y divide-gray-600">
        {data.map((item) => (
          <MovieItemComponent
            key={item.id}
            data={item}
            className="grid grid-cols-4 gap-3 px-2 py-4"
          >
            <MovieItemComponent.Image />
            <MovieItemComponent.Caption className="col-span-3" />
          </MovieItemComponent>
        ))}
      </div>
    </div>
  );
}

function NavigationContent() {
  const { isMediumScreen } = useBreakpoints();
  const links = HEADER_NAV_ITEMS.concat(FOOTER_NAV_ITEMS);

  return (
    <div className="col-span-4 md:col-span-10 md:col-start-2">
      <div className="space-y-16">
        <div className="flex flex-col">
          {links.map((item, index) => (
            <NavItemComponent
              key={item.link}
              to={item.link}
              text={item.label}
              className="animate__animated animate__fadeInLeft"
              style={{ animationDelay: `${index * 0.025}s` }}
            />
          ))}
        </div>
        <div className="space-y-4 animate__animated animate__fadeInUp">
          <p>
            Sign in or Register to add to your watchlist, rate movies, and
            write reviews!
          </p>
          <div className="flex gap-2">
            <ButtonComponent
              text="Sign in"
              variant="outline"
              size={isMediumScreen ? "base" : "sm"}
            />
            <ButtonComponent
              text="Register"
              size={isMediumScreen ? "base" : "sm"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WatchlyDisclaimer() {
  return (
    <div className="flex flex-col col-span-4 gap-4 py-8 animate__animated animate__fadeInUp md:col-span-10 md:col-start-2">
      <img src={SVGs.tmdb_logo} alt="TMDB Logo" className="w-[100px]" />
      <p>
        Watchly uses TMDB but is not endorsed, certified, or otherwise
        approved by TMDB.
      </p>
    </div>
  );
}
