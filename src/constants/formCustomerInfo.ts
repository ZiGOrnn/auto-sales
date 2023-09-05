import { FormCustomerInfo } from "../../components/application/customer-info/types";
import { AddressRecord } from "../repositories/types/addressRecord";

const ADDRESS: AddressRecord = {
  district: "",
  amphoe: "",
  province: "",
  zipcode: 0,
  district_code: 0,
  amphoe_code: 0,
  province_code: 0,
};

export const FORM_CUSTOMER_INFO: FormCustomerInfo = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: {
    day: "",
    month: "",
    year: "",
  },
  address: {
    province: ADDRESS,
    district: ADDRESS,
    subDistrict: ADDRESS,
    postalCode: "",
    detail: "",
  },
};
