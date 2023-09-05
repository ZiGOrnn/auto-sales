import { ApplicationRecord } from "../repositories/application/types/applicationRecord";
import { CollectionName } from "../repositories/types/collection";

export const mapListApplication = (items: ApplicationRecord[]) => {
  return items.map<ApplicationRecord>((item) => {
    const { expand, ...result } = item;
    if (!expand) {
      return result;
    }
    const carModel = expand[CollectionName.CarModel];
    const carModelImage = expand[CollectionName.CarModelImage];
    const costomerInfo = expand[CollectionName.CostomerInfo];
    return {
      ...result,
      car_model: carModel,
      car_model_image: carModelImage,
      costomer_info: costomerInfo,
    };
  });
};
