import { ListResult } from "pocketbase";
import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { mapListApplication } from "../../utils/mapListApplication";

export interface GetListMyApplicationUsecase {
  execute(
    userId: string,
    page?: number,
    limit?: number
  ): Promise<ListResult<ApplicationRecord>>;
}

export class GetListMyApplicationUsecaseImpl
  implements GetListMyApplicationUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ListResult<ApplicationRecord>> {
    const records = await this.applicationRepository.getListMyApplication(
      userId,
      page,
      limit
    );
    records.items = mapListApplication(records.items);
    return records;
  }
}
