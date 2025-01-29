import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { ClockActionTypes, RootState } from "../types/types";
import { thunk, ThunkDispatch } from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, unknown, ClockActionTypes>;
export type AppState = RootState;
