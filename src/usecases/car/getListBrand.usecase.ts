import {
  BrandRepository,
  BrandRepositoryImpl,
} from "../../repositories/car/brand.repository";
import {
  FileRepository,
  FileRepositoryImpl,
} from "../../repositories/file.repository";
import { BrandRecord } from "../../repositories/types/brandRecord";

export interface GetListBrandUsecase {
  execute(): Promise<BrandRecord[]>;
}

export class GetListBrandUsecaseImpl implements GetListBrandUsecase {
  private brandRepository: BrandRepository;
  private fileRepository: FileRepository;

  constructor(
    brandRepository: BrandRepository = new BrandRepositoryImpl(),
    fileRepository: FileRepository = new FileRepositoryImpl()
  ) {
    this.brandRepository = brandRepository;
    this.fileRepository = fileRepository;
  }

  async execute(): Promise<BrandRecord[]> {
    const listRecord = await this.brandRepository.getListBrand();

    const brands = listRecord.map<BrandRecord>((item) => {
      return {
        ...item,
        logo: this.fileRepository.getUrl(item, item.logo),
      };
    });

    return brands;
  }
}
