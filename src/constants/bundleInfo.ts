import { BundleInfo } from "../context/types/initialState";
import { BundleRecord } from "../repositories/types/bundleRecord";

export const BUNDLE: BundleRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  created: "",
  updated: "",
  title: "",
  description: "",
};

export const BUNDLE_INFO: BundleInfo = {
  bundle: BUNDLE,
  coverage: 0,
  durationYear: "",
};
