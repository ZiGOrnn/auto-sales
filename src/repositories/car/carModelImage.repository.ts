import { pb } from "../../pocketbase/pb";
import { CarModelImageRecord } from "../types/carModelImageRecord";
import { CollectionName } from "../types/collection";

export interface CarModelImageRepository {
  getImageByModelIdAndYearId(
    modelId: string,
    yearId: string
  ): Promise<CarModelImageRecord[]>;
}

export class CarModelImageRepositoryImpl implements CarModelImageRepository {
  /**
   * Returns a promise with all list items batch fetched at once (by default 200 items per request; to change it set the batch query param).
   */
  async getImageByModelIdAndYearId(
    modelId: string,
    yearId: string
  ): Promise<CarModelImageRecord[]> {
    const listRecord = await pb
      .collection(CollectionName.CarModelImage)
      .getFullList<CarModelImageRecord>({
        filter: `car_model.id = "${modelId}" && year_model.id = "${yearId}"`,
      });

    return listRecord;
  }
}
