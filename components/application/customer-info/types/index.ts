import { ColorPaletteProp } from "@mui/joy";
import { AddressRecord } from "../../../../src/repositories/types/addressRecord";

export interface GenderList {
  label: string;
  value: string;
  color: ColorPaletteProp;
  icon: React.ReactNode;
}

export interface Address {
  province: AddressRecord;
  district: AddressRecord;
  subDistrict: AddressRecord;
  postalCode: string;
  detail: string;
}

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface FormCustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: DateOfBirth;
  address: Address;
}
