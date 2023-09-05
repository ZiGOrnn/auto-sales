import {
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Radio,
  Slider,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IoCashOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { installmentAmountPerMonth } from "../../../src/utils/installmentAmountPerMonth";
import { interestRateCalculator } from "../../../src/utils/interestRateCalculator";
import RadioGroupList from "../../checked/RadioGroupList";
import styles from "./LoanCalculator.module.css";

interface Props {
  disabled?: boolean;
}

interface DurationYear {
  label: string;
  value: string;
}

const durationYearList: DurationYear[] = [
  {
    label: "1 Year",
    value: "1",
  },
  {
    label: "2 Year",
    value: "2",
  },
  {
    label: "3 Year",
    value: "3",
  },
  {
    label: "5 Year",
    value: "5",
  },
  {
    label: "6 Year",
    value: "6",
  },
];

const LoanCalculator = ({ disabled }: Props) => {
  const { state, dispatch } = useContext(Context);

  const [numInstallments, setNumInstallments] = useState("");

  const onChangeDurationYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const numInstallments = numberOfMonths(+e.target.value).toString();
    const count = countAmountPerMonth(0, 0, +numInstallments);

    dispatch({
      type: "SET_APPLICATON_LOAN",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          loan: {
            ...state.applicaton.loan,
            numInstallments,
            durationYear: e.target.value,
            installmentMonth: count,
          },
        },
      },
    });
  };

  const onChangePresentRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const numbersOnly = inputValue.replace(/[^0-9,.]/g, "");

    const count = countAmountPerMonth(0, +numbersOnly);

    dispatch({
      type: "SET_APPLICATON_LOAN",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          loan: {
            ...state.applicaton.loan,
            interestRate: numbersOnly,
            installmentMonth: count,
          },
        },
      },
    });
  };

  const onChangCoverage = (rate: number) => {
    dispatch({
      type: "SET_APPLICATON_LOAN",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          loan: {
            ...state.applicaton.loan,
            coverage: rate,
          },
        },
      },
    });
  };

  const numberPrincipal = () => {
    const modelPrice = state.applicaton.product.model.price;
    const coverage = state.applicaton.loan.coverage;
    const price = interestRateCalculator(modelPrice, coverage);

    const count = countAmountPerMonth(price);

    dispatch({
      type: "SET_APPLICATON_LOAN",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          loan: {
            ...state.applicaton.loan,
            principal: price,
            installmentMonth: count,
          },
        },
      },
    });
  };

  const numberOfMonths = (year: number): number => {
    return year * 12;
  };

  const countAmountPerMonth = (
    num1: number = 0,
    num2: number = 0,
    num3: number = 0
  ) => {
    const principal = num1 || state.applicaton.loan.principal;
    const interestRate = num2 || +state.applicaton.loan.interestRate;
    const numInstallments = num3 || +state.applicaton.loan.numInstallments;

    const count = installmentAmountPerMonth(
      principal,
      interestRate,
      numInstallments || 1
    ).toFixed(2);

    return count;
  };

  useEffect(() => {
    numberPrincipal();
    return () => {};
  }, [state.applicaton.loan.coverage]);

  useEffect(() => {
    setNumInstallments(() =>
      parseFloat(state.applicaton.loan.installmentMonth).toLocaleString()
    );
    return () => {};
  }, [state.applicaton.loan.installmentMonth]);

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "loan-calculator"
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
              titel: "Loan Calculator",
              value: "loan-calculator",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    if (disabled) {
      dispatch({
        type: "SET_APPLICATON_NEXT_BACK_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            nextTab: "confirm-repayment",
            backTab: "confirm-car-info",
          },
        },
      });
    } else {
      setBreadcrumbs();
      dispatch({
        type: "SET_APPLICATON_NEXT_BACK_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            nextTab: "e-kyc",
            backTab: "car-info",
          },
        },
      });
    }
    return () => {};
  }, []);

  return (
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
          Loan Coverage
        </Typography>
      </div>
      <div className={styles.calculator}>
        <Slider
          disabled={disabled}
          color="info"
          marks={false}
          orientation="horizontal"
          size="lg"
          valueLabelDisplay="auto"
          variant="solid"
          value={state.applicaton.loan.coverage}
          max={100}
          onChange={(e, v) => onChangCoverage(+v.toString())}
          valueLabelFormat={(v) => `${v}%`}
        />
        <Typography
          fontSize="24px"
          lineHeight={1}
          startDecorator={
            <Typography fontSize="lg" textColor="text.secondary">
              ฿
            </Typography>
          }
          sx={{ alignItems: "flex-start" }}
        >
          {state.applicaton.loan.principal.toLocaleString()}
        </Typography>
      </div>
      <div className={styles.label}>
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          interest rate per year (%)
        </Typography>
      </div>
      <div className={styles.calculator}>
        <Input
          disabled={disabled}
          value={state.applicaton.loan.interestRate}
          size="lg"
          placeholder="Present"
          onChange={onChangePresentRate}
          endDecorator={<>%</>}
        />
      </div>
      <div className={styles.label}>
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
          sx={{ paddingBottom: "14px" }}
        >
          Duration Year
        </Typography>
      </div>
      <div className={styles.calculator}>
        <RadioGroupList value={state.applicaton.loan.durationYear}>
          {durationYearList.map((item) => (
            <ListItem key={item.value} variant="outlined">
              <Radio
                disabled={disabled}
                id={item.value}
                value={item.value}
                checkedIcon={<IoCheckmarkCircleSharp />}
                color="info"
                onChange={onChangeDurationYear}
              />
              <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
            </ListItem>
          ))}
        </RadioGroupList>
        <div className="title">
          <Typography
            fontSize="16px"
            lineHeight={1}
            sx={{ alignItems: "flex-start", fontWeight: "bold" }}
          >
            {state.applicaton.loan.numInstallments} Months
          </Typography>
        </div>
      </div>
      <div className={styles.label}>
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Installment/Month
        </Typography>
      </div>
      <div className={styles.calculator}>
        <List
          aria-label="Personal info"
          sx={{ "--ListItemDecorator-size": "72px" }}
        >
          <ListItemButton
            disabled
            variant="outlined"
            sx={{
              borderRadius: 6,
            }}
          >
            <ListItemDecorator>
              <IoCashOutline
                style={{ paddingLeft: 16 }}
                color="#0E5D25"
                fontSize={30}
              />
            </ListItemDecorator>
            <Typography fontSize="xl4">{numInstallments}</Typography>
          </ListItemButton>
        </List>
      </div>
    </motion.div>
  );
};

export default LoanCalculator;
