import {
  ProductTypeRepository,
  ProductTypeRepositoryImpl,
} from "../../repositories/product-type/productType.reposity";
import { ProductTypeRecord } from "../../repositories/product-type/types/productTypeRecord";

export interface GetListProductTypeUsecase {
  execute(): Promise<ProductTypeRecord[]>;
}

export class GetListProductTypeUsecaseImpl
  implements GetListProductTypeUsecase
{
  private productTypeRepository: ProductTypeRepository;

  constructor(
    productTypeRepository: ProductTypeRepository = new ProductTypeRepositoryImpl()
  ) {
    this.productTypeRepository = productTypeRepository;
  }

  async execute(): Promise<ProductTypeRecord[]> {
    const records = await this.productTypeRepository.getListProductType();
    return records;
  }
}
