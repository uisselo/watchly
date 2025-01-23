import { useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { SVGs } from "@Assets";
import { FOOTER_NAV_ITEMS, HEADER_NAV_ITEMS } from "@Config";
import { ButtonComponent } from "../common";
import NavItemComponent from "./NavItemComponent";

type Props = { isOpen: boolean; marginTop: string };

function NavModalComponent(props: Props) {
  const { isOpen, marginTop } = props;

  const isMediumScreen = useMediaQuery("(min-width: 744px)");

  const links = HEADER_NAV_ITEMS.concat(FOOTER_NAV_ITEMS);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 z-50" style={{ marginTop }}>
        <div className="container absolute inset-0 bg-gray-800 md:grid-container">
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
            <div className="flex flex-col gap-4 py-8 animate__animated animate__fadeInUp">
              <img src={SVGs.tmdb_logo} alt="TMDB Logo" className="w-[100px]" />
              <p>
                Watchly uses TMDB but is not endorsed, certified, or otherwise
                approved by TMDB.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NavModalComponent;
