import { SET_CLOCKS, SET_TIMEZONES } from "../store/actions";

export interface Clock {
  id: string;
  timezone: string;
}

export interface Timezone {
  city: string;
  timezone: number;
}

export interface RootState {
  clocks: Clock[];
  timezones: Timezone[];
}

export interface SetClocksAction {
  type: typeof SET_CLOCKS;
  payload: Clock[];
}

export interface SetTimezonesAction {
  type: typeof SET_TIMEZONES;
  payload: Timezone[];
}

export type ClockActionTypes = SetClocksAction | SetTimezonesAction;
