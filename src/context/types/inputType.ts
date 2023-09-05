export type TypeAction =
  | "SET_INITIAL_STATE"
  | "SET_RELOAD"
  | "SET_USER_PROFILE"
  | "SET_TOKEN"
  | "SET_APPLICATON"
  | "SET_APPLICATON_NEXT_BACK_TAB"
  | "SET_APPLICATON_RESET"
  | "SET_APPLICATON_TAB"
  | "SET_APPLICATON_FROM_PRODUCT"
  | "SET_APPLICATON_VERIFIED"
  | "SET_APPLICATON_EKYC"
  | "SET_APPLICATON_IS_CONSENT"
  | "SET_APPLICATON_BACK_BTN"
  | "SET_APPLICATON_PRODUCT_RESET"
  | "SET_APPLICATON_PRODUCT_BRAND"
  | "SET_APPLICATON_PRODUCT_MODEL"
  | "SET_APPLICATON_PRODUCT_YEAR"
  | "SET_APPLICATON_PRODUCT_MODEL_IMAGE"
  | "SET_APPLICATON_LOAN"
  | "SET_APPLICATON_FINANCE"
  | "SET_APPLICATON_CUSTOMER_INFO"
  | "SET_APPLICATON_IS_OPEN_VERIFIED_OTP"
  | "SET_APPLICATON_BREADCRUMBS"
  | "SET_APPLICATON_BUNDLE_INFO";

export type ProductValue = "none" | "new_car" | "used_car";

export type Ekyc = "none" | "dip-chip" | "ekyc";

export type BackBtn = "none" | "tab" | "router";

export type TabName =
  | "none"
  | "car-info"
  | "loan-calculator"
  | "e-kyc"
  | "e-kyc-menu"
  | "credit-score"
  | "customer-info"
  | "confirm-car-info"
  | "confirm-loan-info"
  | "confirm-repayment"
  | "confirm-bundle"
  | "completed";

export type BreadcrumbsId =
  | "Car Info"
  | "Loan Calculator"
  | "Verification"
  | "Dip-Chip"
  | "E-KYC"
  | "Credit Score"
  | "Customer Info"
  | "Confirm Car Info"
  | "Confirm Loan Info"
  | "Repayment"
  | "Bundle"
  | "Completed";
