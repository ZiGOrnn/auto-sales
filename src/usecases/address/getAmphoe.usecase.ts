import {
  AddressRepository,
  AddressRepositoryImpl,
} from "../../repositories/address.repository";
import { AddressRecord } from "../../repositories/types/addressRecord";

export interface GetAmphoeUsecase {
  execute(provinceCode: number): AddressRecord[];
}

export class GetAmphoeUsecaseImpl implements GetAmphoeUsecase {
  private addressRepository: AddressRepository;
  constructor(
    addressRepository: AddressRepository = new AddressRepositoryImpl()
  ) {
    this.addressRepository = addressRepository;
  }

  execute(provinceCode: number): AddressRecord[] {
    const amphoes = this.addressRepository.getListAmphoe(provinceCode);
    return amphoes;
  }
}
