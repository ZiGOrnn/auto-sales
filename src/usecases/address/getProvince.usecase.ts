import {
  AddressRepository,
  AddressRepositoryImpl,
} from "../../repositories/address.repository";
import { AddressRecord } from "../../repositories/types/addressRecord";

export interface GetProvinceUsecase {
  execute(): AddressRecord[];
}

export class GetProvinceUsecaseImpl implements GetProvinceUsecase {
  private addressRepository: AddressRepository;
  constructor(
    addressRepository: AddressRepository = new AddressRepositoryImpl()
  ) {
    this.addressRepository = addressRepository;
  }

  execute(): AddressRecord[] {
    const address = this.addressRepository.getListProvince();
    return address;
  }
}
