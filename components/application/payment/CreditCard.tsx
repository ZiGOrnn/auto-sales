import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  IoCalendarNumber,
  IoCardSharp,
  IoHelpCircleSharp,
} from "react-icons/io5";
import styles from "./Payment.module.css";

type Props = {};

const CreditCard = (props: Props) => {
  const [isModalCVV, setIsModalCVV] = useState(false);

  const modalCVV = () => {
    return (
      <Modal open={isModalCVV} onClose={() => setIsModalCVV(false)}>
        <ModalDialog
          sx={{ width: 500 }}
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
        >
          <ModalClose />
          <Typography id="size-modal-title" component="h2">
            Security Code
          </Typography>
          <Image
            alt="logo_bmw"
            width={400}
            height={250}
            style={{ objectFit: "cover", margin: "auto" }}
            src="/images/cvv.png"
          />
          <Typography level="body2" textAlign="center">
            CVV number (Card Verification Value) is the 3-digital number next to
            the signature area at the back of the card.
          </Typography>
        </ModalDialog>
      </Modal>
    );
  };

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
        Credit Card
      </Typography>
      <div className={styles.payment}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Card Number</FormLabel>
            <Input
              size="lg"
              endDecorator={<IoCardSharp color="#7250A8" fontSize={18} />}
            />
          </FormControl>
          <div className={styles.payment_row}>
            <div className={styles.exprity_date}>
              <FormControl>
                <FormLabel>Exprity Date (MM/YY)</FormLabel>
                <Input
                  size="lg"
                  endDecorator={
                    <IoCalendarNumber color="#7250A8" fontSize={18} />
                  }
                />
              </FormControl>
            </div>
            <div className={styles.cvv}>
              <FormControl>
                <FormLabel>CVV</FormLabel>
                <Input
                  endDecorator={
                    <IoHelpCircleSharp
                      onClick={() => setIsModalCVV(true)}
                      style={{ cursor: "pointer" }}
                      color="#7250A8"
                      fontSize={22}
                    />
                  }
                  size="lg"
                />
              </FormControl>
            </div>
          </div>
          <FormControl>
            <FormLabel>Name on Card</FormLabel>
            <Input size="lg" />
          </FormControl>
        </Stack>
      </div>
      {modalCVV()}
    </motion.div>
  );
};

export default CreditCard;
