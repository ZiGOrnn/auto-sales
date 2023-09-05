"use client";

import { Button, Input, Stack } from "@mui/joy";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import FormControlUI from "../mui/FormControlUI";
import styles from "./FromForgetPassword.module.css";
type Props = {};

const FromForgetPassword = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const submitForgetPassword = () => {
    console.log(
      "🚀 ~ file: FromForgetPasswordViewModel.ts:8 ~ submitForgetPassword ~ email:",
      email
    );
  };

  const onClickBackToLogin = () => {
    router.back();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Image
        className={styles.logo_scb}
        src="/images/logo/logo_scb.png"
        width={200}
        height={74}
        alt="logo_scb"
      />
      <p className={styles.title}>
        Enter the email associated with your account and we’ll send you a
        recovery link:
      </p>
      <form onSubmit={submitForgetPassword}>
        <Stack spacing={2}>
          <FormControlUI label="Email">
            <Input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControlUI>
          <Stack spacing={2}>
            <Button
              startDecorator={<IoMailUnreadOutline fontSize={18} />}
              color="info"
              fullWidth
              type="submit"
            >
              Send recovery link
            </Button>
            <Button
              color="neutral"
              fullWidth
              variant="plain"
              type="button"
              onClick={onClickBackToLogin}
            >
              Back to login
            </Button>
          </Stack>
        </Stack>
      </form>
    </motion.div>
  );
};

export default FromForgetPassword;
