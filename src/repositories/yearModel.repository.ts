import { pb } from "../pocketbase/pb";
import { CollectionName } from "./types/collection";
import { YearRecord } from "./types/yearRecord";

export interface YearModelRepository {
  getListYearModelByCarModelId(modelId: string): Promise<YearRecord[]>;
}

export class YearModelRepositoryImpl implements YearModelRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getListYearModelByCarModelId(modelId: string): Promise<YearRecord[]> {
    const listRecord = await pb
      .collection(CollectionName.YearModel)
      .getFullList<YearRecord>({
        filter: `car_model.id = "${modelId}"`,
        sort: "-year",
      });
    return listRecord;
  }
}
