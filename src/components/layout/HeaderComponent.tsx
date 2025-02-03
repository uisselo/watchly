import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { SVGs } from "@Assets";
import { HEADER_NAV_ITEMS } from "@Config";
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
  }, [location, navModalComponentRef]);

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
          <SearchBoxComponent className="hidden grow md:flex" />
          <ButtonComponent text="Sign up" className="hidden lg:flex" />
          <Link to="/browse" className="md:hidden">
            <ButtonIconComponent icon={MagnifyingGlassIcon} />
          </Link>
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
