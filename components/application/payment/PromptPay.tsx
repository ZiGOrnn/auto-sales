import { Typography } from "@mui/joy";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Payment.module.css";

type Props = {};

const PromptPay = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: 16 }}
    >
      <Typography
        level="body3"
        textTransform="uppercase"
        fontWeight="lg"
        mb={1}
      >
        Prompt Pay
      </Typography>
      <div className={styles.payment}>
        <div className={styles.prompt_pay}>
          <Image
            alt="logo_bmw"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "300px",
              height: "auto",
              objectFit: "contain",
            }}
            src="/images/qr-code/qr_code_prompt_pay.jpg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PromptPay;
