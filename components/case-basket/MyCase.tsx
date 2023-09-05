"use client";

import { Stack, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../src/context/store";
import { ApplicationRecord } from "../../src/repositories/application/types/applicationRecord";
import { GetListMyApplicationUsecaseImpl } from "../../src/usecases/application/getListMyApplication.usecase";
import { SearchMyCaseByNameUsecaseImpl } from "../../src/usecases/case-basket/searchMyCaseByName.usecase";
import ListCaseBasket from "./ListCaseBasket";
import SearchCase from "./SearchCase";

const MyCase = () => {
  const { state } = useContext(Context);

  const [myApplications, setMyApplications] = useState<ApplicationRecord[]>([]);

  const getListApplication = async () => {
    try {
      const getListMyApplicationUsecase = new GetListMyApplicationUsecaseImpl();
      const result = await getListMyApplicationUsecase.execute(state.user.id);
      setMyApplications(result.items);
    } catch (error) {
      console.log(
        "🚀 ~ file: MyCase.tsx:28 ~ getListApplication ~ error:",
        error
      );
    }
  };

  const searchMyCase = async (search: string) => {
    try {
      console.log("🚀 ~ file: MyCase.tsx:42 ~ searchMyCase ~ search:", search);
      const searchMyCaseByNameUsecase = new SearchMyCaseByNameUsecaseImpl();
      const result = await searchMyCaseByNameUsecase.execute(
        search,
        state.user.id
      );
      setMyApplications(result.items);
      console.log("🚀 ~ file: MyCase.tsx:38 ~ searchMyCase ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ file: MyCase.tsx:37 ~ searchMyCase ~ error:", error);
    }
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
        <SearchCase placeholder="Search by Name" onSearch={searchMyCase} />
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          My Case
        </Typography>
        <ListCaseBasket type="my-case-basket" applications={myApplications} />
      </Stack>
    </motion.div>
  );
};

export default MyCase;
