"use client";

import { Button, Container, Stack, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IoScanSharp } from "react-icons/io5";
import { MdAdfScanner } from "react-icons/md";
import SuccessIcon from "../../../components/success-icon/SuccessIcon";
import { Context } from "../../../src/context/store";
import styles from "../create-application.module.css";

const DipChip = () => {
  const { state, dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const onClickScan = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      success();
    }, 3000);
  };

  const success = () => {
    setIsSuccess(true);
    verified();
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 2800);
  };

  const verified = () => {
    dispatch({
      type: "SET_APPLICATON_VERIFIED",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          verified: true,
        },
      },
    });
  };

  return (
    <Container maxWidth="md">
      <SuccessIcon isLoading={isLoading} isSuccess={isSuccess} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.selfie}>
          <Box sx={{ flexGrow: 1 }} />
          <Stack spacing={4}>
            <Stack color="#814CDE" alignItems="center" justifyContent="center">
              <MdAdfScanner fontSize={240} />
            </Stack>
            <div>
              <Typography level="body2" textAlign="center" sx={{ width: 300 }}>
                Please insert the smart card into the card reader to verify your
                identity.
              </Typography>
            </div>
            <Button
              color="info"
              startDecorator={<IoScanSharp fontSize={18} />}
              style={{ borderRadius: 30 }}
              onClick={onClickScan}
            >
              Scan
            </Button>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
        </div>
      </motion.div>
    </Container>
  );
};

export default DipChip;
