import moment from "moment";
import { formatDate } from "@Utilities";

/**
 * Gets the start and end dates for a specified time range ("week", "month", or "year").
 *
 * @param type - The type of range to calculate:
 *    - "week" for the current week.
 *    - "month" for the current month.
 *    - "year" for the current year.
 * @returns An object containing the `start_date` and `end_date` formatted as "YYYY-MM-DD".
 */
function getRange(type: "week" | "month" | "year") {
  return {
    start_date: formatDate(moment().startOf(type), "YYYY-MM-DD"),
    end_date: formatDate(moment().endOf(type), "YYYY-MM-DD"),
  };
}

export { getRange };
