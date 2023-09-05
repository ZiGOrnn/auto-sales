import {
  CarModelRepository,
  CarModelRepositoryImpl,
} from "../../repositories/car/carModel.repository";
import { ModelRecord } from "../../repositories/types/modelRecord";

export interface GetListModelUsecase {
  execute(brandId: string): Promise<ModelRecord[]>;
}

export class GetListModelUsecaseImpl implements GetListModelUsecase {
  private carModelRepository: CarModelRepository;

  constructor(
    carModelRepository: CarModelRepository = new CarModelRepositoryImpl()
  ) {
    this.carModelRepository = carModelRepository;
  }

  async execute(brandId: string): Promise<ModelRecord[]> {
    const listRecord = await this.carModelRepository.getListModelByBrandId(
      brandId
    );
    return listRecord;
  }
}
