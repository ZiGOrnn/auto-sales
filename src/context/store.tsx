"use client";

import { createContext, useReducer } from "react";
import { APPLICATON } from "../constants/applicaton";
import { USER } from "../constants/user";
import { Children } from "../types/children";
import { reducer } from "./reducers";
import { ContextState, InitialState } from "./types/initialState";

export const initialState: InitialState = {
  token: "",
  applicaton: APPLICATON,
  user: USER,
  reload: false,
};

export const Context = createContext<ContextState>({
  state: initialState,
  dispatch: () => {},
});

export const Store = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
