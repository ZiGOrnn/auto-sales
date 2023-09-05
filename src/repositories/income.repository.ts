import { pb } from "../pocketbase/pb";
import { CollectionName } from "./types/collection";
import { IncomeRecord } from "./types/incomeRecord";

export interface IncomeRepository {
  getListIncome(): Promise<IncomeRecord[]>;
}

export class IncomeRepositoryImpl implements IncomeRepository {
  async getListIncome(): Promise<IncomeRecord[]> {
    const listRecord = await pb
      .collection(CollectionName.Income)
      .getFullList<IncomeRecord>();
    return listRecord;
  }
}
