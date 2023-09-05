"use client";

import { Button, Container } from "@mui/joy";
import { AppBar, Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import Layout from "../../components/layout/Layout";
import { Context } from "../../src/context/store";
import { Children } from "../../src/types/children";
import { CompletedeApplicationUsecaseImpl } from "../../src/usecases/application/completedeApplication.usecase";

const RootLayout = ({ children }: Children) => {
  const { state, dispatch } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onClickNext = () => {
    if (state.applicaton.tab === "confirm-bundle") {
      dispatch({
        type: "SET_APPLICATON_IS_CONSENT",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            isConsent: true,
          },
        },
      });
    }
    dispatch({
      type: "SET_APPLICATON_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          tab: state.applicaton.nextTab,
        },
      },
    });
  };

  const onClickBack = () => {
    if (state.applicaton.backBtn === "router") {
      router.back();
      return;
    }

    if (state.applicaton.tab === "car-info") {
      setFromProduct();
    } else {
      dispatch({
        type: "SET_APPLICATON_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            tab: state.applicaton.backTab,
          },
        },
      });
    }
  };

  const onClickVerified = () => {
    dispatch({
      type: "SET_APPLICATON_IS_OPEN_VERIFIED_OTP",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          isOpenVerifiedOTP: true,
          otpType: "verified-otp",
        },
      },
    });
  };

  const checkNextBtn = (): boolean => {
    switch (state.applicaton.tab) {
      case "car-info":
        return true;
      case "loan-calculator":
        return true;
      case "credit-score":
        return true;
      case "customer-info":
        return true;
      default:
        return false;
    }
  };

  const checkBackBtn = (): boolean => {
    if (state.applicaton.tab === "completed") return false;
    return true;
  };

  const checkConfirmBtn = (): boolean => {
    switch (state.applicaton.tab) {
      case "confirm-car-info":
        return true;
      case "confirm-loan-info":
        return true;
      case "confirm-repayment":
        return true;
      case "confirm-bundle":
        return true;
      default:
        return false;
    }
  };

  const checkCompleted = (): boolean => {
    return state.applicaton.tab === "completed";
  };

  const onClickonConfirm = () => {
    if (state.applicaton.tab === "confirm-bundle") {
      dispatch({
        type: "SET_APPLICATON_IS_OPEN_VERIFIED_OTP",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            isOpenVerifiedOTP: true,
            otpType: "verified-otp-and-signature",
          },
        },
      });
    }
    onClickNext();
  };

  const onClickCompleted = async () => {
    try {
      setLoading(true);
      const completedeApplicationUsecase =
        new CompletedeApplicationUsecaseImpl();
      const app = await completedeApplicationUsecase.execute(
        state.applicaton,
        state.user
      );
      setLoading(false);
      router.replace("menu");
    } catch (error) {
      setLoading(false);
      console.log(
        "🚀 ~ file: layout.tsx:177 ~ onClickCompleted ~ error:",
        error
      );
    }
  };

  const setFromProduct = () => {
    dispatch({
      type: "SET_APPLICATON_FROM_PRODUCT",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          fromProduct: "none",
        },
      },
    });
  };

  return (
    <Layout backButton>
      {children}
      {state.applicaton.fromProduct !== "none" && (
        <div
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 1000,
            background: "#ffffff",
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            style={{ borderTop: "1px solid #f3f3f3", background: "#ffffff" }}
          >
            <Container maxWidth="md">
              <Toolbar disableGutters variant="regular">
                {checkBackBtn() && (
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

                {checkNextBtn() && (
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

                {state.applicaton.tab === "e-kyc-menu" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button
                      disabled={!state.applicaton.verified}
                      variant="solid"
                      startDecorator={
                        <IoCheckmarkCircleOutline fontSize={18} />
                      }
                      color="info"
                      style={{ borderRadius: "30px" }}
                      onClick={onClickVerified}
                    >
                      Verified
                    </Button>
                  </motion.div>
                )}

                {checkConfirmBtn() && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button
                      variant="solid"
                      endDecorator={<IoChevronForwardOutline fontSize={18} />}
                      color="info"
                      style={{ borderRadius: "30px" }}
                      onClick={onClickonConfirm}
                    >
                      Confirm
                    </Button>
                  </motion.div>
                )}

                {checkCompleted() && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button
                      variant="solid"
                      startDecorator={
                        <IoCheckmarkCircleOutline fontSize={18} />
                      }
                      color="info"
                      style={{ borderRadius: "30px" }}
                      onClick={onClickCompleted}
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </motion.div>
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      )}
    </Layout>
  );
};

export default RootLayout;
