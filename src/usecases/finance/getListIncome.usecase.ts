import {
  IncomeRepository,
  IncomeRepositoryImpl,
} from "../../repositories/income.repository";
import { IncomeRecord } from "../../repositories/types/incomeRecord";

export interface GetListIncomeUsecase {
  execute(): Promise<IncomeRecord[]>;
}

export class GetListIncomeUsecaseImpl implements GetListIncomeUsecase {
  private incomeRepository: IncomeRepository;

  constructor(incomeRepository: IncomeRepository = new IncomeRepositoryImpl()) {
    this.incomeRepository = incomeRepository;
  }

  async execute(): Promise<IncomeRecord[]> {
    const incomes = await this.incomeRepository.getListIncome();
    return incomes;
  }
}
