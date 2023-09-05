import { pb } from "../../pocketbase/pb";
import { BrandRecord } from "../types/brandRecord";
import { CollectionName } from "../types/collection";

export interface BrandRepository {
  getListBrand(): Promise<BrandRecord[]>;
}

export class BrandRepositoryImpl implements BrandRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getListBrand(): Promise<BrandRecord[]> {
    const listRecord = await pb
      .collection(CollectionName.Brand)
      .getFullList<BrandRecord>({
        sort: "-name",
      });
    return listRecord;
  }
}
