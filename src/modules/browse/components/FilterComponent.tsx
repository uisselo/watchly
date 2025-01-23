import { useSharedQueries } from "../../shared";
import { POPULARITY_OPTIONS, RATING_OPTIONS } from "../constants";

function FilterComponent() {
  const { genreList } = useSharedQueries();

  if (!genreList) return null;

  return (
    <div className="space-y-6 md:p-5 md:bg-gray-700 md:rounded-xl">
      <div className="flex flex-col gap-3">
        <p>Popularity</p>
        <div className="flex flex-wrap gap-1.5">
          {POPULARITY_OPTIONS.map((item) => (
            <Tag key={item.label} text={item.label} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>Rating</p>
        <div className="flex flex-wrap gap-1.5">
          {RATING_OPTIONS.map((item) => (
            <Tag key={item.label} text={item.label} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>Genre</p>
        <div className="flex flex-wrap gap-1.5">
          {genreList.map((item) => (
            <Tag key={item.id} text={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;

function Tag({ text }: { text: string }) {
  return (
    <div className="custom-inner-shadow bottom bg-gray-600 px-2 py-1.5 md:px-3 md:py-2 rounded-[28px]">
      <p>{text}</p>
    </div>
  );
}
