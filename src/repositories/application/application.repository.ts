import { ListResult } from "pocketbase";
import { pb } from "../../pocketbase/pb";
import { CollectionName } from "../types/collection";
import { ApplicationRecord } from "./types/applicationRecord";
import { CreateApplicationRecord } from "./types/createApplicationRecord";
import { UpdateMyCase } from "./types/updateMyCase";

export interface ApplicationRepository {
  createApplication(data: CreateApplicationRecord): Promise<ApplicationRecord>;
  getOneApplication(id: string): Promise<ApplicationRecord>;
  getListApplication(
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>>;
  getListMyApplication(
    userId: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>>;
  deleteWithDateApplication(id: string): Promise<ApplicationRecord>;
  updateMyCaseApplication(
    id: string,
    data: UpdateMyCase
  ): Promise<ApplicationRecord>;
  searchApplicationByName(
    search: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>>;
  searchMyCaseByName(
    search: string,
    userId: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>>;
}

export class ApplicationRepositoryImpl implements ApplicationRepository {
  async createApplication(
    data: CreateApplicationRecord
  ): Promise<ApplicationRecord> {
    const record = await pb
      .collection(CollectionName.Application)
      .create<ApplicationRecord>(data);
    return record;
  }

  async getOneApplication(id: string): Promise<ApplicationRecord> {
    const record = await pb
      .collection(CollectionName.Application)
      .getOne<ApplicationRecord>(id, {
        expand:
          "costomer_info, brand, car_model, car_model_image, year_model, income, debt, product_type, bundle",
      });
    return record;
  }

  async getListApplication(
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await pb
      .collection(CollectionName.Application)
      .getList<ApplicationRecord>(page, limit, {
        filter: `my_case = '' && delete = ''`,
        expand: "costomer_info, car_model, car_model_image, product_type",
      });
    return records;
  }

  async getListMyApplication(
    userId: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await pb
      .collection(CollectionName.Application)
      .getList<ApplicationRecord>(page, limit, {
        filter: `my_case.id = '${userId}' && delete = ''`,
        expand: "costomer_info, car_model, car_model_image",
        sort: "-created",
      });
    return records;
  }

  async deleteWithDateApplication(id: string): Promise<ApplicationRecord> {
    const records = await pb
      .collection(CollectionName.Application)
      .update<ApplicationRecord>(id, {
        delete: new Date(),
      });
    return records;
  }

  async updateMyCaseApplication(
    id: string,
    data: UpdateMyCase
  ): Promise<ApplicationRecord> {
    const records = await pb
      .collection(CollectionName.Application)
      .update<ApplicationRecord>(id, data);
    return records;
  }

  async searchApplicationByName(
    search: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await pb
      .collection(CollectionName.Application)
      .getList<ApplicationRecord>(page, limit, {
        filter: `costomer_info.first_name ~ '${search}' && delete = ''`,
        expand: "costomer_info, car_model, car_model_image, product_type",
        sort: "-created",
      });
    return records;
  }

  async searchMyCaseByName(
    search: string,
    userId: string,
    page: number,
    limit: number
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await pb
      .collection(CollectionName.Application)
      .getList<ApplicationRecord>(page, limit, {
        filter: `costomer_info.first_name ~ '${search}' && my_case = '${userId}' && delete = ''`,
        expand: "costomer_info, car_model, car_model_image, product_type",
        sort: "-created",
      });
    return records;
  }
}
