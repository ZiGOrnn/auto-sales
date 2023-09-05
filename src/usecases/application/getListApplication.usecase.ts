import { ListResult } from "pocketbase";
import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { CollectionName } from "../../repositories/types/collection";

export interface GetListApplicationUsecase {
  execute(
    page?: number,
    limit?: number
  ): Promise<ListResult<ApplicationRecord>>;
}

export class GetListApplicationUsecaseImpl
  implements GetListApplicationUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(
    page: number = 1,
    limit: number = 20
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await this.applicationRepository.getListApplication(
      page,
      limit
    );
    records.items = records.items.map<ApplicationRecord>((item) => {
      const { expand, ...result } = item;
      if (typeof expand === "undefined") {
        return result;
      }
      const carModel = expand[CollectionName.CarModel];
      const carModelImage = expand[CollectionName.CarModelImage];
      const costomerInfo = expand[CollectionName.CostomerInfo];
      const productType = expand[CollectionName.ProductType];
      return {
        ...result,
        car_model: carModel,
        car_model_image: carModelImage,
        costomer_info: costomerInfo,
        product_type: productType,
      };
    });
    return records;
  }
}
