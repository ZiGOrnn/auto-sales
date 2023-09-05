import {
  Button,
  Container,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BiMobileVibration } from "react-icons/bi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Context } from "../../src/context/store";
import Signature from "../application/signature/Signature";
import Content from "../content/Content";
import styles from "./Otp.module.css";

type OtpType = "send-otp" | "verified-otp" | "signature";

const Otp = () => {
  const { state, dispatch } = useContext(Context);

  const [otpType, setOtpType] = useState<OtpType>("send-otp");

  const onCloseModal = () => {
    setOtpType("send-otp");

    if (state.applicaton.tab === "confirm-bundle") {
      dispatch({
        type: "SET_APPLICATON_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            tab: "completed",
          },
        },
      });
    } else if (state.applicaton.tab === "e-kyc-menu") {
      dispatch({
        type: "SET_APPLICATON_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            tab: "credit-score",
          },
        },
      });
    }

    dispatch({
      type: "SET_APPLICATON_IS_OPEN_VERIFIED_OTP",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          isOpenVerifiedOTP: false,
        },
      },
    });
  };

  const onClickSendOtp = () => {
    console.log(
      "🚀 ~ file: Otp.tsx:72 ~ onClickSendOtp ~ type:",
      state.applicaton.otpType
    );
    if (state.applicaton.otpType === "verified-otp-and-signature") {
      setOtpType("signature");
    } else {
      onCloseModal();
    }
  };

  const sendOTP = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.otp}
    >
      <Stack spacing={2}>
        <Stack
          color="#814CDE"
          alignItems="center"
          justifyContent="center"
          paddingBottom="40px"
        >
          <BiMobileVibration fontSize={160} />
        </Stack>
        <Typography textAlign="center" id="layout-modal-title" component="h2">
          OTP Verification
        </Typography>
        <Typography
          id="layout-modal-description"
          textColor="text.tertiary"
          textAlign="center"
        >
          We will send you an One Time Password on this mobile number
        </Typography>
        <Stack spacing={3}>
          <Input
            type="tel"
            placeholder="Phone Number"
            size="lg"
            variant="outlined"
          />
          <Button color="info" onClick={() => setOtpType("verified-otp")}>
            Send OTP
          </Button>
        </Stack>
      </Stack>
    </motion.div>
  );

  const verifiedOTP = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.otp}
    >
      <Stack spacing={2}>
        <Stack
          color="#814CDE"
          alignItems="center"
          justifyContent="center"
          paddingBottom="40px"
        >
          <IoChatbubbleEllipsesOutline fontSize={160} />
        </Stack>
        <Typography textAlign="center" id="layout-modal-title" component="h2">
          OTP Verification
        </Typography>
        <Typography
          id="layout-modal-description"
          textColor="text.tertiary"
          textAlign="center"
          width="300px"
        >
          Enter the OTP sent to +66 637322289
        </Typography>
        <Stack spacing={3}>
          <Input type="tel" placeholder="OTP" size="lg" variant="outlined" />
          <Button color="info" fullWidth onClick={() => onClickSendOtp()}>
            Verified OTP
          </Button>
        </Stack>
      </Stack>
    </motion.div>
  );

  const signature = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Signature
        </Typography>
      </div>
      <Stack spacing={3} alignItems="center">
        <div className="sig_canvas">
          <Signature />
        </div>
        <div className="sig_button">
          <Button color="info" fullWidth onClick={() => onCloseModal()}>
            Accept
          </Button>
        </div>
      </Stack>
    </motion.div>
  );

  return (
    <Modal
      open={state.applicaton.isOpenVerifiedOTP || false}
      onClose={() => onCloseModal()}
    >
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        layout="fullscreen"
      >
        <ModalClose />
        <Container maxWidth="md">
          <Content>
            {otpType === "send-otp" && sendOTP}
            {otpType === "verified-otp" && verifiedOTP}
            {otpType === "signature" && signature}
          </Content>
        </Container>
      </ModalDialog>
    </Modal>
  );
};

export default Otp;
