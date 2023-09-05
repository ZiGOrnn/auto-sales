"use client";

import { Button, Container } from "@mui/joy";
import { AppBar, Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Layout from "../../components/layout/Layout";
import { Context } from "../../src/context/store";
import { TabName } from "../../src/context/types/inputType";
import { Children } from "../../src/types/children";

const RootLayout = ({ children }: Children) => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const onClickNext = () => {
    dispatch({
      type: "SET_APPLICATON_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          tab: switchTabNext(state.applicaton.tab),
        },
      },
    });
  };

  const onClickBack = () => {
    if (state.applicaton.backBtn === "router") {
      router.back();
      return;
    }

    dispatch({
      type: "SET_APPLICATON_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          tab: switchTabBack(state.applicaton.tab),
        },
      },
    });
  };

  const switchTabNext = (tab?: TabName): TabName => {
    switch (tab) {
      case "car-info": {
        return "loan-calculator";
      }
      default: {
        return "car-info";
      }
    }
  };

  const switchTabBack = (tab?: TabName): TabName => {
    switch (tab) {
      case "car-info": {
        return "car-info";
      }
      case "loan-calculator": {
        return "car-info";
      }
      default: {
        return "car-info";
      }
    }
  };

  return (
    <Layout backButton>
      {children}
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        style={{
          top: "auto",
          bottom: 0,
          borderTop: "1px solid #f3f3f3",
          background: "#ffffff",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters variant="regular">
            {state.applicaton.tab !== "car-info" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button
                  variant="soft"
                  startDecorator={<IoChevronBackOutline fontSize={18} />}
                  color="info"
                  style={{ borderRadius: "30px" }}
                  onClick={onClickBack}
                >
                  Back
                </Button>
              </motion.div>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {state.applicaton.tab === "car-info" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button
                  variant="solid"
                  endDecorator={<IoChevronForwardOutline fontSize={18} />}
                  color="info"
                  style={{ borderRadius: "30px" }}
                  onClick={onClickNext}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Layout>
  );
};

export default RootLayout;
