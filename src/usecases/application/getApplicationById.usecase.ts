import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { CollectionName } from "../../repositories/types/collection";

export interface GetApplicationByIdUsecase {
  execute(id: string): Promise<ApplicationRecord>;
}

export class GetApplicationByIdUsecaseImpl
  implements GetApplicationByIdUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(id: string): Promise<ApplicationRecord> {
    const { expand, ...record } =
      await this.applicationRepository.getOneApplication(id);
    if (typeof expand === "undefined") {
      throw new Error(GetApplicationByIdUsecaseImpl.name);
    }
    const brand = expand[CollectionName.Brand];
    const carModel = expand[CollectionName.CarModel];
    const carModelImage = expand[CollectionName.CarModelImage];
    const yearModel = expand[CollectionName.YearModel];
    const costomerInfo = expand[CollectionName.CostomerInfo];
    const income = expand[CollectionName.Income];
    const debt = expand[CollectionName.Debt];
    const productType = expand[CollectionName.ProductType];
    const bundle = expand[CollectionName.Bundle];
    return {
      ...record,
      brand: brand,
      car_model: carModel,
      car_model_image: carModelImage,
      costomer_info: costomerInfo,
      year_model: yearModel,
      income: income,
      debt: debt,
      product_type: productType,
      bundle: bundle,
    };
  }
}
