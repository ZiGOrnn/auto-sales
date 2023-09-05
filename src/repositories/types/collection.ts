export enum CollectionName {
  Users = "users",
  Brand = "brand",
  CarModel = "car_model",
  YearModel = "year_model",
  CarModelImage = "car_model_image",
  Income = "income",
  Debt = "debt",
  Bundle = "bundle",
  Application = "application",
  CostomerInfo = "costomer_info",
  ProductType = "product_type",
}

export interface User {
  username: string;
  email: string;
  emailVisibility?: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface Login {
  username: string;
  password: string;
}
