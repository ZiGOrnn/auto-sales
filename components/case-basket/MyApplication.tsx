"use client";

import { Stack, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../src/context/store";
import { ApplicationRecord } from "../../src/repositories/application/types/applicationRecord";
import { GetListApplicationUsecaseImpl } from "../../src/usecases/application/getListApplication.usecase";
import ListCaseBasket from "./ListCaseBasket";
import SearchCase from "./SearchCase";

const MyApplication = () => {
  const { state } = useContext(Context);

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  const getListApplication = async () => {
    try {
      const getListApplicationUsecase = new GetListApplicationUsecaseImpl();
      const result = await getListApplicationUsecase.execute();
      console.log(
        "🚀 ~ file: page.tsx:125 ~ getListApplication ~ applicationData:",
        result
      );
      setApplications(result.items);
    } catch (error) {
      console.log(
        "🚀 ~ file: MyApplication.tsx:28 ~ getListApplication ~ error:",
        error
      );
    }
  };

  const searchMyApplication = (search: string) => {
    console.log(
      "🚀 ~ file: MyApplication.tsx:37 ~ searchMyApplication ~ search:",
      search
    );
  };

  useEffect(() => {
    getListApplication();
    return () => {};
  }, [state.reload]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack spacing={2}>
        <SearchCase
          placeholder="Search by Name"
          onSearch={searchMyApplication}
        />
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          My Application
        </Typography>
        <ListCaseBasket type="case-basket" applications={applications} />
      </Stack>
    </motion.div>
  );
};

export default MyApplication;
