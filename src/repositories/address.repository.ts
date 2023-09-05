import address from "../data/province.json";
import { AddressRecord } from "./types/addressRecord";

type AddressKey = "province_code" | "district_code" | "amphoe_code";

export interface AddressRepository {
  getListAddress(): Array<AddressRecord>;
  getListProvince(): Array<AddressRecord>;
  getListAmphoe(provinceCode: number): Array<AddressRecord>;
  getListSubDistrict(amphoeCode: number): Array<AddressRecord>;
}

export class AddressRepositoryImpl implements AddressRepository {
  getListAddress(): AddressRecord[] {
    return address as Array<AddressRecord>;
  }

  getListProvince(): AddressRecord[] {
    const address = this.getListAddress();
    return this.removeDuplicateObject(address, "province_code");
  }

  getListAmphoe(provinceCode: number): AddressRecord[] {
    const address = this.getListAddress();
    const provinces = address.filter((a) => a.province_code === provinceCode);
    const amphoes = this.removeDuplicateObject(provinces, "amphoe_code");
    return amphoes;
  }

  getListSubDistrict(amphoeCode: number): AddressRecord[] {
    const address = this.getListAddress();
    const subDistricts = address.filter((a) => a.amphoe_code === amphoeCode);
    return subDistricts;
  }

  private removeDuplicateObject(
    address: AddressRecord[],
    key: AddressKey
  ): AddressRecord[] {
    const uniqueObjects: AddressRecord[] = [];
    const uniqueKeys = new Set<string>();

    for (const obj of address) {
      if (!uniqueKeys.has(obj[key].toString())) {
        uniqueKeys.add(obj[key].toString());
        uniqueObjects.push(obj);
      }
    }

    return uniqueObjects;
  }
}
