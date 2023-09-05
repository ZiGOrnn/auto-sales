"use client";

import { Button, Divider, Input, Stack } from "@mui/joy";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { Context } from "../../src/context/store";
import { LoginUsecaseImpl } from "../../src/usecases/auth/login.usecase";
import FormControlUI from "../mui/FormControlUI";
import styles from "./FormLogin.module.css";

const FormLogin = () => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const loginUsecase = new LoginUsecaseImpl();
      const { record, token } = await loginUsecase.execute({
        username: username,
        password: password,
      });

      dispatch({
        type: "SET_USER_PROFILE",
        payload: {
          ...state,
          token,
          user: record,
        },
      });
      setLoading(false);

      router.push("/menu");
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ file: FormLogin.tsx:36 ~ submitLogin ~ error:", error);
    }
  };

  const onClickForgetPassword = () => {
    router.push("/forget-password");
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
      <form onSubmit={submitLogin}>
        <Stack spacing={2}>
          <FormControlUI label="Username">
            <Input
              required
              type="email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControlUI>
          <FormControlUI label="Password">
            <Input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControlUI>
          <Stack spacing={2}>
            <Button color="info" fullWidth type="submit" loading={loading}>
              Login
            </Button>
            <Divider>OR</Divider>
            <Button
              color="neutral"
              fullWidth
              variant="soft"
              type="button"
              onClick={onClickForgetPassword}
            >
              Forget Password?
            </Button>
          </Stack>
        </Stack>
      </form>
    </motion.div>
  );
};

export default FormLogin;
