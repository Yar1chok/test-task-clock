import { ClockActionTypes, RootState } from "../types/types";
import { SET_CLOCKS, SET_TIMEZONES } from "./actions";

const initialState: RootState = {
  clocks: [{ id: "1", timezone: "2" }],
  timezones: [],
};

export const rootReducer = (
  state = initialState,
  action: ClockActionTypes
): RootState => {
  switch (action.type) {
    case SET_CLOCKS:
      return { ...state, clocks: action.payload };
    case SET_TIMEZONES:
      return { ...state, timezones: action.payload };
    default:
      return state;
  }
};
