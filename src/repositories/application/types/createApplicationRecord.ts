export type ApplicationStatus = "Success" | "Requested" | "Not Qualified";

export interface CreateApplicationRecord {
  user: string;
  loan_coverage: number;
  loan_interest_rate: number;
  loan_installment_month: number;
  loan_duration_year: number;
  verified: boolean;
  otp: string;
  income: string;
  debt: string;
  costomer_info: string;
  product_type: string;
  brand: string;
  car_model: string;
  car_model_image: string;
  year_model: string;
  signature: string;
  bundle: string;
  bundle_coverage: number;
  bundle_duration_year: number;
  my_case: string;
  status: string;
  score: number;
  watched?: boolean;
  delete?: Date;
}
