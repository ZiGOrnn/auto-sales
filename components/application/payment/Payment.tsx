import {
  Avatar,
  ColorPaletteProp,
  FormLabel,
  ListItem,
  ListItemDecorator,
  Radio,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IoCard, IoCheckmarkCircleSharp, IoWallet } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import RadioGroupList from "../../checked/RadioGroupList";
import CreditCard from "./CreditCard";
import styles from "./Payment.module.css";
import PromptPay from "./PromptPay";

type PaymentValue = "credit-card" | "prompt-pay";

export interface PaymentList {
  label: string;
  value: PaymentValue;
  color: ColorPaletteProp;
  icon: React.ReactNode;
}

const paymentList: PaymentList[] = [
  {
    label: "Credit Card",
    value: "credit-card",
    color: "info",
    icon: <IoCard fontSize={18} />,
  },

  {
    label: "Prompt Pay",
    value: "prompt-pay",
    color: "info",
    icon: <IoWallet fontSize={18} />,
  },
];

const Payment = () => {
  const { state, dispatch } = useContext(Context);

  const [paymentType, setPaymentType] = useState(paymentList[0].value);

  const onChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPaymentType(e.target.value as PaymentValue);
  };

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "confirm-repayment"
    );
    if (cb) return;
    dispatch({
      type: "SET_APPLICATON_BREADCRUMBS",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          breadcrumbs: [
            ...state.applicaton.breadcrumbs,
            {
              titel: "Repayment",
              value: "confirm-repayment",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    setBreadcrumbs();
    dispatch({
      type: "SET_APPLICATON_NEXT_BACK_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          nextTab: "confirm-bundle",
          backTab: "confirm-loan-info",
        },
      },
    });
    return () => {};
  }, []);

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
        Payment Methods
      </Typography>
      <div className={styles.payment}>
        <RadioGroupList value={paymentType}>
          {paymentList.map((item) => (
            <ListItem key={item.value} variant="outlined">
              <Radio
                id={item.value}
                value={item.value}
                checkedIcon={<IoCheckmarkCircleSharp />}
                color="info"
                onChange={onChangePayment}
              />
              <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                <Avatar variant="soft" size="sm" color={item.color}>
                  {item.icon}
                </Avatar>
              </ListItemDecorator>
              <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
            </ListItem>
          ))}
        </RadioGroupList>
      </div>
      {paymentType === "credit-card" && <CreditCard />}
      {paymentType === "prompt-pay" && <PromptPay />}
    </motion.div>
  );
};

export default Payment;
