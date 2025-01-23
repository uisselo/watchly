import type { HTMLAttributes, PropsWithChildren } from "react";
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
      <div className={cn("flex flex-col gap-3", className)} {...divProps}>
        {children}
      </div>
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

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center rounded aspect-[2/3] overflow-hidden",
        className,
      )}
      {...divProps}
    >
      <img
        src={isBackdrop ? data.backdrop_url : data.poster_url}
        alt={`${data.title} Poster`}
        className="object-cover size-full"
      />
    </div>
  );
}

function Caption() {
  const { data } = useProductItemContext();

  return (
    <div className="space-y-0.5 font-medium">
      <p className="line-clamp-1">{data.title}</p>
      <p className="text-xs md:text-sm">
        {formatDate(data.release_date, "YYYY")}
      </p>
    </div>
  );
}
