import { pb } from "../../pocketbase/pb";
import { CollectionName } from "../types/collection";
import { CostomerRecord } from "./types/costomerRecord";
import { CreateCostomerRecord } from "./types/createCostomerRecord";

export interface CostomerRepository {
  createCostomer(data: CreateCostomerRecord): Promise<CostomerRecord>;
}

export class CostomerRepositoryImpl implements CostomerRepository {
  async createCostomer(data: CreateCostomerRecord): Promise<CostomerRecord> {
    const record = await pb
      .collection(CollectionName.CostomerInfo)
      .create<CostomerRecord>(data);
    return record;
  }
}
