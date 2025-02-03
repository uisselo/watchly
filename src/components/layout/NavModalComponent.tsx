import { SVGs } from "@Assets";
import { FOOTER_NAV_ITEMS, HEADER_NAV_ITEMS } from "@Config";
import { useBreakpoints } from "@Utilities";
import { ButtonComponent } from "../common";
import NavItemComponent from "./NavItemComponent";
import HeaderComponent from "./HeaderComponent";

function NavModalComponent({ onClose }: { onClose: () => void }) {
  const { isMediumScreen } = useBreakpoints();
  const links = HEADER_NAV_ITEMS.concat(FOOTER_NAV_ITEMS);

  return (
    <div className="space-y-8">
      <HeaderComponent onClose={onClose} />
      <div className="container md:grid-container">
        <div className="md:col-span-10 md:col-start-2">
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
                Sign in or Register to add to your watchlist, rate movies,
                and write reviews!
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
          <div className="flex flex-col gap-4 py-8 animate__animated animate__fadeInUp">
            <img
              src={SVGs.tmdb_logo}
              alt="TMDB Logo"
              className="w-[100px]"
            />
            <p>
              Watchly uses TMDB but is not endorsed, certified, or
              otherwise approved by TMDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavModalComponent;
