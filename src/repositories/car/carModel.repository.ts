import { pb } from "../../pocketbase/pb";
import { CollectionName } from "../types/collection";
import { ModelRecord } from "../types/modelRecord";

export interface CarModelRepository {
  getListModelByBrandId(brandId: string): Promise<ModelRecord[]>;
}

export class CarModelRepositoryImpl implements CarModelRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getListModelByBrandId(brandId: string): Promise<ModelRecord[]> {
    const record = await pb
      .collection(CollectionName.CarModel)
      .getFullList<ModelRecord>({
        filter: `brand.id = "${brandId}"`,
      });
    return record;
  }
}
