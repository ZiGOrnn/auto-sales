import { Finance } from "../context/types/initialState";
import { DebtRecord } from "../repositories/types/debtRecord";
import { IncomeRecord } from "../repositories/types/incomeRecord";

const INCOME: IncomeRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  title: "",
  start: 0,
  end: 0,
};

const DEBT: DebtRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  title: "",
};

export const FINANCE: Finance = {
  income: INCOME,
  debt: DEBT,
};
