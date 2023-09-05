import {
  AddressRepository,
  AddressRepositoryImpl,
} from "../../repositories/address.repository";
import { AddressRecord } from "../../repositories/types/addressRecord";

export interface GetListSubDistrictUsecase {
  execute(amphoeCode: number): AddressRecord[];
}

export class GetListSubDistrictUsecaseImpl
  implements GetListSubDistrictUsecase
{
  private addressRepository: AddressRepository;
  constructor(
    addressRepository: AddressRepository = new AddressRepositoryImpl()
  ) {
    this.addressRepository = addressRepository;
  }

  execute(amphoeCode: number): AddressRecord[] {
    const subDistricts = this.addressRepository.getListSubDistrict(amphoeCode);
    return subDistricts;
  }
}
