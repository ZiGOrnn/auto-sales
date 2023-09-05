import {
  DebtRepository,
  DebtRepositoryImpl,
} from "../../repositories/debt.repository";
import { DebtRecord } from "../../repositories/types/debtRecord";

export interface GetListDebtUsecase {
  execute(): Promise<DebtRecord[]>;
}

export class GetListDebtUsecaseImpl implements GetListDebtUsecase {
  private debtRepository: DebtRepository;

  constructor(debtRepository: DebtRepository = new DebtRepositoryImpl()) {
    this.debtRepository = debtRepository;
  }

  async execute(): Promise<DebtRecord[]> {
    const debts = await this.debtRepository.getListDebt();
    return debts;
  }
}
