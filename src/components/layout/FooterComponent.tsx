import { Link } from "react-router";
import { SVGs } from "@Assets";
import { FOOTER_NAV_ITEMS } from "@Config";
import { ButtonComponent } from "../common";

function FooterComponent() {
  return (
    <footer className="w-full py-8 bg-gray-700 md:py-12 lg:py-16">
      <div className="container space-y-8 md:space-y-0 md:grid-container">
        <div className="flex flex-col gap-4 md:col-span-6 lg:col-span-5">
          <Link to="/">
            <img src={SVGs.logo} alt="Watchly Logo" className="w-[120px]" />
          </Link>
          <p className="text-xs md:text-sm ">
            This website is not fully functional. It was created to be included
            in a portfolio showcasing design and development skills.
          </p>
          <div className="flex gap-4">
            {FOOTER_NAV_ITEMS.map((item) => (
              <ButtonComponent
                key={item.label}
                text={item.label}
                variant="link"
                size="sm"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end md:col-span-6 lg:col-span-4 lg:col-start-9">
          <img src={SVGs.tmdb_logo} alt="TMDB Logo" className="w-[100px]" />
          <p className="text-xs md:text-sm md:text-right">
            Watchly uses TMDB but is not endorsed, certified, or otherwise
            approved by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
