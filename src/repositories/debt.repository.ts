import { pb } from "../pocketbase/pb";
import { CollectionName } from "./types/collection";
import { DebtRecord } from "./types/debtRecord";

export interface DebtRepository {
  getListDebt(): Promise<DebtRecord[]>;
}

export class DebtRepositoryImpl implements DebtRepository {
  async getListDebt(): Promise<DebtRecord[]> {
    const listRecord = await pb
      .collection(CollectionName.Debt)
      .getFullList<DebtRecord>();
    return listRecord;
  }
}
