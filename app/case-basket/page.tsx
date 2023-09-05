"use client";

import { Container } from "@mui/joy";
import { motion } from "framer-motion";
import TabCaseBasKet from "../../components/case-basket/TabCaseBasKet";
import Content from "../../components/content/Content";

const CaseBasket = () => {
  return (
    <Container maxWidth="md">
      <Content>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TabCaseBasKet />
          <br />
        </motion.div>
      </Content>
    </Container>
  );
};

export default CaseBasket;
