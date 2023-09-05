import { useContext, useEffect } from "react";
import { Context } from "../../src/context/store";
import styles from "./CreditScore.module.css";
import ScoreCard from "./ScoreCard";

const CreditScore = () => {
  const { state, dispatch } = useContext(Context);

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "credit-score"
    );
    if (cb) return;
    dispatch({
      type: "SET_APPLICATON_BREADCRUMBS",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          breadcrumbs: [
            ...state.applicaton.breadcrumbs,
            {
              titel: "Credit Score",
              value: "credit-score",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    setBreadcrumbs();
    dispatch({
      type: "SET_APPLICATON_NEXT_BACK_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          nextTab: "customer-info",
          backTab: "e-kyc-menu",
        },
      },
    });

    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <ScoreCard />
    </div>
  );
};

export default CreditScore;
