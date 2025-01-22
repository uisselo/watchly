import clsx, { type ClassValue } from "clsx";
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

export { cn };
