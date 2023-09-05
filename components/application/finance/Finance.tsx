import { Option, Select, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { IoCashOutline, IoWalletOutline } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { DebtRecord } from "../../../src/repositories/types/debtRecord";
import { IncomeRecord } from "../../../src/repositories/types/incomeRecord";
import { GetListDebtUsecaseImpl } from "../../../src/usecases/finance/getListDebt.usecase";
import { GetListIncomeUsecaseImpl } from "../../../src/usecases/finance/getListIncome.usecase";
import styles from "../newcar/NewCar.module.css";

interface Props {
  disabled?: boolean;
}

const Finance = ({ disabled }: Props) => {
  const { state, dispatch } = useContext(Context);

  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  const [debts, setDebts] = useState<DebtRecord[]>([]);

  const getIncome = async () => {
    try {
      const getListIncomeUsecase = new GetListIncomeUsecaseImpl();
      const listIncomes = await getListIncomeUsecase.execute();
      if (!listIncomes) return;
      setIncomes(listIncomes);
    } catch (error) {
      console.log("🚀 ~ file: Finance.tsx:27 ~ getIncome ~ error:", error);
    }
  };

  const getDebts = async () => {
    try {
      const getListDebtUsecase = new GetListDebtUsecaseImpl();
      const listDebts = await getListDebtUsecase.execute();
      if (!listDebts) return;
      setDebts(listDebts);
    } catch (error) {
      console.log("🚀 ~ file: Finance.tsx:39 ~ getDebts ~ error:", error);
    }
  };

  const onChangeIncome = (incomeId: string) => {
    const income = incomes.find((ic) => ic.id === incomeId);
    if (!income) return;

    dispatch({
      type: "SET_APPLICATON_FINANCE",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          finance: {
            ...state.applicaton.finance,
            income,
          },
        },
      },
    });
  };

  const onChangeDebt = (debtId: string) => {
    const debt = debts.find((db) => db.id === debtId);
    if (!debt) return;

    dispatch({
      type: "SET_APPLICATON_FINANCE",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          finance: {
            ...state.applicaton.finance,
            debt,
          },
        },
      },
    });
  };

  useEffect(() => {
    getIncome();
    getDebts();
    return () => {};
  }, []);

  return (
    <>
      <div className={styles.title}>
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Finance
        </Typography>
      </div>
      <div className={styles.section_row}>
        <div className={styles.income}>
          <Stack spacing={2}>
            <Select
              disabled={disabled}
              value={state.applicaton.finance.income.id}
              size="lg"
              placeholder="Income"
              startDecorator={<IoWalletOutline />}
              onChange={(_, v) => onChangeIncome(v as string)}
            >
              {incomes.map((income) => (
                <Option key={income.id} value={income.id}>
                  {income.title}
                </Option>
              ))}
            </Select>
          </Stack>
        </div>
        <div className={styles.debt}>
          <Stack spacing={2}>
            <Select
              disabled={disabled}
              value={state.applicaton.finance.debt.id}
              size="lg"
              placeholder="Debt"
              startDecorator={<IoCashOutline />}
              onChange={(_, v) => onChangeDebt(v as string)}
            >
              {debts.map((debt) => (
                <Option key={debt.id} value={debt.id}>
                  {debt.title}
                </Option>
              ))}
            </Select>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Finance;
