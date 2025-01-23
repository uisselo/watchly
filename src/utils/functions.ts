import clsx, { type ClassValue } from "clsx";
import moment, { type Moment } from "moment";
import { twMerge } from "tailwind-merge";

/**
 * Combines the utility functions `clsx` and `twMerge` to merge and conditionally apply Tailwind CSS classes.
 *
 * It first applies conditional classes using `clsx`, and then merges them using `twMerge` to avoid conflicts
 * with Tailwind's class generation and ensure only the necessary classes are included.
 *
 * @param classes A list of class names (strings) or objects containing conditional class names to apply.
 * @returns A string containing the merged and conditionally applied class names.
 */
function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

/**
 * Formats a given date into a specific string pattern.
 *
 * @param date - The date to be formatted. Can be a string, Moment object, or Date object.
 * @param pattern - The format string specifying the desired date format.
 *                  Defaults to "MMMM DD, YYYY" if not provided.
 */
function formatDate(date: string | Moment | Date, pattern?: string) {
  return moment(date).format(pattern || "MMMM DD, YYYY");
}

export { cn, formatDate };
