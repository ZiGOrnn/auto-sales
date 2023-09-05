import { pb } from "../../pocketbase/pb";
import { CollectionName } from "../types/collection";
import { ProductTypeRecord } from "./types/productTypeRecord";

export interface ProductTypeRepository {
  getListProductType(): Promise<ProductTypeRecord[]>;
}

export class ProductTypeRepositoryImpl implements ProductTypeRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getListProductType(): Promise<ProductTypeRecord[]> {
    const records = await pb
      .collection(CollectionName.ProductType)
      .getFullList<ProductTypeRecord>();
    return records;
  }
}
