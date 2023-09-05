import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Context } from "../../../src/context/store";
import { useSelectedTab } from "../../../src/utils/useSelectedTab";
import ProductType from "../product-type/ProductType";

const SelectProduct = () => {
  const { state, dispatch } = useContext(Context);

  const { selectedTab } = useSelectedTab({ state });

  const resetApplicationState = () => {
    if (state.applicaton.fromProduct === "none") {
      dispatch({ type: "SET_APPLICATON_PRODUCT_RESET", payload: { ...state } });
    }
  };

  useEffect(() => {
    resetApplicationState();
    return () => {};
  }, [state.applicaton.fromProduct]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTab ? selectedTab.label : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {selectedTab ? selectedTab.component : <ProductType />}
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectProduct;
