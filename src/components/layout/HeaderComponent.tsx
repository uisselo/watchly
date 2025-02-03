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
  XMarkIcon,
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
import NavItemComponent from "./NavItemComponent";
import NavModalComponent from "./NavModalComponent";

function HeaderComponent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navModalComponentRef = useRef<ModalComponentFunctions>(null);

  const handleNavClick = () => {
    if (onClose) onClose();
    navModalComponentRef.current?.open();
  };

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   *  Should always run every time the route changes.
   */
  useEffect(() => {
    navModalComponentRef.current?.close();
  }, [location]);

  return (
    <header className="container sticky top-0 z-20 flex items-center justify-between py-4 bg-gray-800 lg:grid-container lg:py-6">
      <div className="flex items-center gap-4 md:col-span-8 lg:col-span-5">
        <ButtonIconComponent
          icon={onClose ? XMarkIcon : Bars3Icon}
          className="lg:hidden"
          onClick={handleNavClick}
        />
        <Link to="/">
          <img src={SVGs.logo} alt="Watchly Logo" className="w-[120px]" />
        </Link>
      </div>
      <div className="flex items-center gap-16 md:col-span-4 lg:col-span-7">
        <div className="hidden lg:block">
          <div className="flex items-center justify-end gap-12 w-max">
            {HEADER_NAV_ITEMS.map((item) => (
              <NavItemComponent
                key={item.link}
                to={item.link}
                text={item.label}
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
          />
        </div>
      </div>
      <ModalComponent
        ref={navModalComponentRef}
        className="z-50 bg-gray-800"
      >
        <NavModalComponent
          onClose={() => navModalComponentRef.current?.close()}
        />
      </ModalComponent>
    </header>
  );
}

export default HeaderComponent;

function AutocompleteSearch() {
  const navigate = useNavigate();
  const { isLargeScreen } = useBreakpoints();

  const [query, setQuery] = useState("");

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
          className="hidden md:flex"
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
