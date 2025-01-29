import { AppDispatch } from "../store/store";
import { setTimezones } from "../store/actions";
import { Timezone } from "../types/types";

export const fetchTimezones = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("/timezones.json");
      const data = await response.json();

      if (Array.isArray(data.timezones)) {
        const timezonesWithNumbers: Timezone[] = data.timezones.map(
          (timezone: { city: string; timezone: string }) => {
            const timezoneNumber = parseInt(
              timezone.timezone.replace("UTC", ""),
              10
            );
            return { city: timezone.city, timezone: timezoneNumber };
          }
        );
        dispatch(setTimezones(timezonesWithNumbers));
      } else {
        console.error("Invalid format for timezones");
      }
    } catch (error) {
      console.error("Failed to fetch timezones:", error);
    }
  };
};
