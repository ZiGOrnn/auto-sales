import {
  BundleRepository,
  BundleRepositoryImpl,
} from "../../repositories/bundle.repository";
import { BundleRecord } from "../../repositories/types/bundleRecord";

export interface GetListBundlesUsecase {
  execute(): Promise<BundleRecord[]>;
}

export class GetListBundlesUsecaseImpl implements GetListBundlesUsecase {
  private bundleRepository: BundleRepository;

  constructor(bundleRepository: BundleRepository = new BundleRepositoryImpl()) {
    this.bundleRepository = bundleRepository;
  }

  async execute(): Promise<BundleRecord[]> {
    const record = await this.bundleRepository.getListBundles();
    return record;
  }
}
