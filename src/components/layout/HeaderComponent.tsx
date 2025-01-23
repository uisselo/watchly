import { useState } from "react";
import { Link } from "react-router";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMeasure } from "@uidotdev/usehooks";
import { SVGs } from "@Assets";
import { HEADER_NAV_ITEMS } from "@Config";
import {
  ButtonComponent,
  ButtonIconComponent,
  SearchBoxComponent,
} from "../common";
import NavItemComponent from "./NavItemComponent";
import NavModalComponent from "./NavModalComponent";

function HeaderComponent() {
  const [ref, { height: headerHeight }] = useMeasure();

  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  return (
    <>
      <header
        ref={ref}
        className="container sticky top-0 z-20 flex items-center justify-between py-4 bg-gray-800 lg:grid-container lg:py-6"
      >
        <div className="flex items-center gap-4 md:col-span-8 lg:col-span-5">
          <ButtonIconComponent
            icon={isNavModalOpen ? XMarkIcon : Bars3Icon}
            className="lg:hidden"
            onClick={() => setIsNavModalOpen(!isNavModalOpen)}
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
            <SearchBoxComponent className="flex hidden md:block lg:min-w-0 lg:w-0 grow" />
            <ButtonComponent text="Sign up" className="hidden lg:block" />
            <Link to="/browse">
              <ButtonIconComponent
                icon={MagnifyingGlassIcon}
                className="md:hidden"
              />
            </Link>
          </div>
        </div>
      </header>
      <NavModalComponent
        isOpen={isNavModalOpen}
        marginTop={`${headerHeight}px`}
      />
    </>
  );
}

export default HeaderComponent;
