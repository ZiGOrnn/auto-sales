import { pb } from "../pocketbase/pb";
import { BundleRecord } from "./types/bundleRecord";
import { CollectionName } from "./types/collection";

export interface BundleRepository {
  getListBundles(): Promise<BundleRecord[]>;
}

export class BundleRepositoryImpl implements BundleRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getListBundles() {
    const record = await pb
      .collection(CollectionName.Bundle)
      .getFullList<BundleRecord>();
    return record;
  }
}
