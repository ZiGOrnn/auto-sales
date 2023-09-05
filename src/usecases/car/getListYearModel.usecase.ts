import { YearRecord } from "../../repositories/types/yearRecord";
import {
  YearModelRepository,
  YearModelRepositoryImpl,
} from "../../repositories/yearModel.repository";

export interface GetListYearModelUsecase {
  execute(modelId: string): Promise<YearRecord[]>;
}

export class GetListYearModelUsecaseImpl implements GetListYearModelUsecase {
  private yearModelRepository: YearModelRepository;

  constructor(
    yearModelRepository: YearModelRepository = new YearModelRepositoryImpl()
  ) {
    this.yearModelRepository = yearModelRepository;
  }

  async execute(modelId: string): Promise<YearRecord[]> {
    const years = await this.yearModelRepository.getListYearModelByCarModelId(
      modelId
    );
    return years;
  }
}
