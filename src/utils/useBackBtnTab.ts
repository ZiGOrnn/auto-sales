import { Dispatch, useEffect } from "react";
import { Action, InitialState } from "../context/types/initialState";

interface Props {
  state: InitialState;
  dispatch: Dispatch<Action>;
}

export const useBackBtnTab = ({ state, dispatch }: Props) => {
  useEffect(() => {
    if (state.applicaton.backBtn === "router") {
      dispatch({
        type: "SET_APPLICATON_BACK_BTN",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            backBtn: "tab",
          },
        },
      });
    }
    return () => {};
  }, []);
};
