import { Product } from "../context/types/initialState";
import { BrandRecord } from "../repositories/types/brandRecord";
import { CarModelImageRecord } from "../repositories/types/carModelImageRecord";
import { ModelRecord } from "../repositories/types/modelRecord";
import { YearRecord } from "../repositories/types/yearRecord";

export const BRAND: BrandRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  name: "",
  logo: "",
};

export const MODEL: ModelRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  model: "",
  price: 0,
  brand: "",
  brochure_url: "",
};

export const YEAR: YearRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  year: "",
  car_model: "",
};

export const CAR_MODEL_IMAGE: CarModelImageRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  color: "",
  color_code: "",
  image: "",
  car_model: "",
  year_model: "",
};

export const PRODUCT: Product = {
  brand: BRAND,
  model: MODEL,
  year: YEAR,
  modelImage: CAR_MODEL_IMAGE,
};
