import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Combobox,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { SVGs } from "@Assets";
import { HEADER_NAV_ITEMS } from "@Config";
import {
  type MovieItem,
  MovieItemComponent,
  updateDataDisplayLength,
  useBrowseMovieQueries,
  useBrowseMovieStore,
} from "@Modules";
import { useBreakpoints } from "@Utilities";
import {
  ButtonComponent,
  ButtonIconComponent,
  ModalComponent,
  type ModalComponentFunctions,
  SearchBoxComponent,
} from "../common";
import { HeaderContext, useHeaderContext } from "./contexts";
import NavItemComponent from "./NavItemComponent";
import NavModalComponent from "./NavModalComponent";

function HeaderComponent() {
  const location = useLocation();
  const { isMediumScreen } = useBreakpoints();
  const navModalRef = useRef<ModalComponentFunctions>(null);

  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleIconClick = (searchIcon?: boolean) => {
    setIsSearch(searchIcon || false);
    navModalRef.current?.open();
  };

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *  Should always run every time the route changes.
   */
  useEffect(() => {
    navModalRef.current?.close();
  }, [location]);

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *  Should only run on query change.
   */
  useEffect(() => {
    if (query.length && isMediumScreen && !isSearch) {
      setIsSearch(true);
      navModalRef.current?.open();
    }
  }, [query]);

  return (
    <HeaderContext.Provider
      value={{
        navModalRef,
        query,
        isSearch,
        setQuery,
        setIsSearch,
      }}
    >
      <header className="container sticky top-0 z-20 flex items-center justify-between py-4 bg-gray-800 lg:py-6">
        <div className="flex items-center gap-4">
          <ButtonIconComponent
            icon={Bars3Icon}
            className="lg:hidden"
            onClick={() => handleIconClick()}
          />
          <Link to="/">
            <img
              src={SVGs.logo}
              alt="Watchly Logo"
              className="w-[120px]"
            />
          </Link>
        </div>
        <div className="flex items-center gap-16">
          <div className="hidden lg:block">
            <div className="flex items-center justify-end gap-12 w-max">
              {HEADER_NAV_ITEMS.map((item) => (
                <NavItemComponent
                  key={item.link}
                  to={item.link}
                  text={item.label}
                  isActive={item.link === location.pathname}
                  isDesktop
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 grow">
            <AutocompleteSearch />
            <ButtonComponent text="Sign up" className="hidden lg:flex" />
            <ButtonIconComponent
              icon={MagnifyingGlassIcon}
              className="md:hidden"
              onClick={() => handleIconClick(true)}
            />
          </div>
        </div>
        <ModalComponent ref={navModalRef} className="z-50 bg-gray-800">
          <NavModalComponent />
        </ModalComponent>
      </header>
    </HeaderContext.Provider>
  );
}

export default HeaderComponent;

function AutocompleteSearch() {
  const navigate = useNavigate();
  const { query, setQuery } = useHeaderContext();
  const { isLargeScreen } = useBreakpoints();

  const { searchResults } = useBrowseMovieStore();
  useBrowseMovieQueries(query);

  const data = useMemo(
    () => updateDataDisplayLength(searchResults, 3),
    [searchResults],
  );

  const onChange = (item: MovieItem | null) => {
    if (item) return navigate(`/movie/${item.id}`);
  };

  return (
    <Combobox onChange={onChange}>
      <div className="relative grow">
        <SearchBoxComponent
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="hidden w-[18rem] md:flex"
          isAutocomplete
        />
        {isLargeScreen && (
          <ComboboxOptions
            as="div"
            className="absolute inset-x-0 top-0 z-50 py-2 translate-y-16 bg-gray-600 rounded-lg"
          >
            {data.map((item) => (
              <ComboboxOption key={item.id} value={item}>
                <MovieItemComponent
                  data={item}
                  className="grid grid-cols-4 gap-3 px-3 py-2 hover:bg-gray-700"
                >
                  <MovieItemComponent.Image />
                  <MovieItemComponent.Caption className="col-span-3" />
                </MovieItemComponent>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}
