/**
 * A service for interacting with the TMDb API.
 * Provides methods for making API requests.
 */

import { API_KEY, API_URL } from "@Config";

/**
 * Sends a GET request to the specified API endpoint.
 *
 * @param endpoint - The API endpoint to call (relative to the base URL).
 * @param payload - Optional query parameters to include in the request.
 * @returns A promise that resolves to the parsed JSON response.
 * @throws Throws an error if the response is not successful (non-2xx status).
 */
async function get<T>(
  endpoint: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  const params = new URLSearchParams({
    ...payload,
    api_key: API_KEY,
  }).toString();

  const response = await fetch(`${API_URL}/${endpoint}?${params}`);

  if (!response.ok) throw new Error("Error fetching data from TMDb.");

  return response.json();
}

/**
 * The APIService provides methods for interacting with the TMDb API.
 */
export const APIService = { get };
