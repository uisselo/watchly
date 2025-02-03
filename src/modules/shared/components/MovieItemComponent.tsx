import type { HTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router";
import { cn, formatDate } from "@Utilities";
import { MovieItemContext, useProductItemContext } from "../contexts";
import type { MovieItem } from "../store";

type Props = PropsWithChildren<
  { data: MovieItem } & HTMLAttributes<HTMLDivElement>
>;

function MovieItemComponent(props: Props) {
  const { children, data, className, ...divProps } = props;

  return (
    <MovieItemContext.Provider value={{ data }}>
      <Link to={`/movie/${data.id}`}>
        <div
          className={cn("flex flex-col gap-3", className)}
          {...divProps}
        >
          {children}
        </div>
      </Link>
    </MovieItemContext.Provider>
  );
}

export default MovieItemComponent;

MovieItemComponent.Image = Image;
MovieItemComponent.Caption = Caption;

function Image(
  props: { isBackdrop?: boolean } & HTMLAttributes<HTMLDivElement>,
) {
  const { isBackdrop, className, ...divProps } = props;
  const { data } = useProductItemContext();
  const hasNoImage = !data.backdrop_path && !data.poster_path;

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center rounded aspect-[2/3] overflow-hidden",
        { "border-2 border-gray-400": hasNoImage },
        className,
      )}
      {...divProps}
    >
      {hasNoImage ? (
        <div className="flex flex-col items-center justify-center gap-1 p-4 text-center bg-gray-700 rounded size-full">
          <p className="font-medium line-clamp-2 md:line-clamp-3">
            {data.title}
          </p>
          {data.release_date && (
            <p className="text-xs md:text-sm">
              {formatDate(data.release_date, "YYYY")}
            </p>
          )}
        </div>
      ) : (
        <img
          src={isBackdrop ? data.backdrop_url : data.poster_url}
          alt={`${data.title} Poster`}
          className="object-cover size-full"
        />
      )}
    </div>
  );
}

function Caption(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...divProps } = props;
  const { data } = useProductItemContext();

  return (
    <div
      className={cn("space-y-0.5 font-medium", className)}
      {...divProps}
    >
      <p className="line-clamp-1">{data.title}</p>
      {data.release_date && (
        <p className="text-xs md:text-sm">
          {formatDate(data.release_date, "YYYY")}
        </p>
      )}
    </div>
  );
}
