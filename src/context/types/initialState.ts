import { Dispatch } from "react";
import { FormCustomerInfo } from "../../../components/application/customer-info/types";
import { UserRecord } from "../../repositories/auth/types/userRecord";
import { ProductTypeRecord } from "../../repositories/product-type/types/productTypeRecord";
import { BrandRecord } from "../../repositories/types/brandRecord";
import { BundleRecord } from "../../repositories/types/bundleRecord";
import { CarModelImageRecord } from "../../repositories/types/carModelImageRecord";
import { DebtRecord } from "../../repositories/types/debtRecord";
import { IncomeRecord } from "../../repositories/types/incomeRecord";
import { ModelRecord } from "../../repositories/types/modelRecord";
import { YearRecord } from "../../repositories/types/yearRecord";
import {
  BackBtn,
  BreadcrumbsId,
  Ekyc,
  ProductValue,
  TabName,
  TypeAction,
} from "./inputType";

export interface Product {
  brand: BrandRecord;
  model: ModelRecord;
  year: YearRecord;
  modelImage: CarModelImageRecord;
}

export interface Loan {
  coverage: number;
  principal: number;
  interestRate: string;
  durationYear: string;
  numInstallments: string;
  installmentMonth: string;
}

export interface Finance {
  income: IncomeRecord;
  debt: DebtRecord;
}

export interface BundleInfo {
  bundle: BundleRecord;
  coverage: number;
  durationYear: string;
}

export interface AppBreadcrumbs {
  titel: BreadcrumbsId;
  value: TabName;
}

export interface Applicaton {
  tab: TabName;
  breadcrumbs: AppBreadcrumbs[];
  nextTab: TabName;
  backTab: TabName;
  fromProduct: ProductValue;
  productType: ProductTypeRecord;
  ekyc: Ekyc;
  verified: boolean;
  backBtn: BackBtn;
  isConsent: boolean;
  isOpenVerifiedOTP: boolean;
  otpType: "verified-otp" | "verified-otp-and-signature";
  product: Product;
  finance: Finance;
  customerInfo: FormCustomerInfo;
  loan: Loan;
  bundleInfo: BundleInfo;
  score: number;
}

export interface InitialState {
  token: string;
  user: UserRecord;
  applicaton: Applicaton;
  reload: boolean;
}

export interface Action {
  type: TypeAction;
  payload: InitialState;
}

export interface ContextState {
  state: InitialState;
  dispatch: Dispatch<Action>;
}
