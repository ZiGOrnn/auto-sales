import { Applicaton } from "../context/types/initialState";
import { BUNDLE_INFO } from "./bundleInfo";
import { FINANCE } from "./finance";
import { FORM_CUSTOMER_INFO } from "./formCustomerInfo";
import { LOAN } from "./loan";
import { PRODUCT } from "./product";
import { PRODUCTTYPE } from "./productType";

export const APPLICATON: Applicaton = {
  tab: "car-info",
  fromProduct: "none",
  ekyc: "none",
  verified: false,
  backBtn: "tab",
  isConsent: false,
  isOpenVerifiedOTP: false,
  product: PRODUCT,
  finance: FINANCE,
  customerInfo: FORM_CUSTOMER_INFO,
  loan: LOAN,
  bundleInfo: BUNDLE_INFO,
  otpType: "verified-otp",
  productType: PRODUCTTYPE,
  score: 0,
  nextTab: "none",
  backTab: "none",
  breadcrumbs: [],
};
