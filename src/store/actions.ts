import { Clock, Timezone } from "../types/types";

export const SET_CLOCKS = "SET_CLOCKS";
export const SET_TIMEZONES = "SET_TIMEZONES";

export const setClocks = (clocks: Clock[]) => ({
  type: SET_CLOCKS as typeof SET_CLOCKS,
  payload: clocks,
});

export const setTimezones = (timezones: Timezone[]) => ({
  type: SET_TIMEZONES as typeof SET_TIMEZONES,
  payload: timezones,
});
