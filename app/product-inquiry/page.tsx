"use client";

import { Container } from "@mui/joy";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { Context } from "../../src/context/store";
import { useSelectedTab } from "../../src/utils/useSelectedTab";

const CreateApplication = () => {
  const { state, dispatch } = useContext(Context);
  const { selectedTab } = useSelectedTab({ state });

  const fromProduct = (): React.ReactNode => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab.label : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab ? selectedTab.component : <></>}
        </motion.div>
      </AnimatePresence>
    );
  };

  useEffect(() => {
    dispatch({
      type: "SET_APPLICATON_FROM_PRODUCT",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          fromProduct: "new_car",
        },
      },
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <Container maxWidth="md" sx={{ paddingBottom: 16 }}>
        <Content>{fromProduct()}</Content>
      </Container>
    </Suspense>
  );
};

export default CreateApplication;
