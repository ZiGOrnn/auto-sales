import {
  CostomerRepository,
  CostomerRepositoryImpl,
} from "../../repositories/costomer/costomer.repository";
import { CostomerRecord } from "../../repositories/costomer/types/costomerRecord";
import { CreateCostomerRecord } from "../../repositories/costomer/types/createCostomerRecord";

export interface CreateCostomerUsecase {
  execute(payload: CreateCostomerRecord): Promise<CostomerRecord>;
}

export class CreateCostomerUsecaseImpl implements CreateCostomerUsecase {
  private costomerRepository: CostomerRepository;

  constructor(
    costomerRepository: CostomerRepository = new CostomerRepositoryImpl()
  ) {
    this.costomerRepository = costomerRepository;
  }

  async execute(payload: CreateCostomerRecord): Promise<CostomerRecord> {
    const record = await this.costomerRepository.createCostomer(payload);
    return record;
  }
}
