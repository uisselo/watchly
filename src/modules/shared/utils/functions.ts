import { IMAGE_URL } from "@Config";
import type { MovieItem } from "../store";

/**
 * Constructs a full URL for an image hosted on TMDb.
 *
 * @param path - The relative path to the image (e.g., `/path/to/image.jpg`).
 * @param size - The desired image size. Defaults to "original". Common sizes include:
 *   - "original" - The full-size image.
 *   - "w500" - A smaller, 500px wide image.
 *   - "w300" - A 300px wide image.
 *
 * The available sizes depend on the image's type and TMDb's API configuration.
 */
function getImageUrl(path: string, size = "original"): string {
  return IMAGE_URL + size + path;
}

/**
 * Limits the data to a specified display length.
 *
 * @param data - The original array of items.
 * @param displayLength -The maximum number of items to include in the returned array.
 *   If `displayLength` is 0 or not provided, all items in the array will be returned.
 */
function updateDataDisplayLength<T>(data: T[], displayLength = 0): T[] {
  const slicedData = data.slice(0, displayLength);
  const finalData = displayLength ? slicedData : data;
  return finalData;
}

/**
 * Updates the movie data by appending image URLs.
 *
 * @param data - An array of movie objects retrieved from the TMDb API.
 * @returns A new array of movie objects with updated properties:
 *   - `backdrop_url`: The full URL of the movie's backdrop image, derived from `backdrop_path`.
 *   - `poster_url`: The full URL of the movie's poster image, derived from `poster_path`.
 */
function updateMovieData(data: MovieItem[]): MovieItem[] {
  const updatedData = data.map((item) => ({
    ...item,
    backdrop_url: getImageUrl(item.backdrop_path),
    poster_url: getImageUrl(item.poster_path),
  }));

  return updatedData;
}

export { getImageUrl, updateDataDisplayLength, updateMovieData };
