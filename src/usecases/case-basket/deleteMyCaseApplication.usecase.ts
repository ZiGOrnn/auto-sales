import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";

export interface DeleteMyCaseApplicationUsecase {
  execute(id: string): Promise<ApplicationRecord>;
}

export class DeleteMyCaseApplicationUsecaseImpl
  implements DeleteMyCaseApplicationUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(id: string): Promise<ApplicationRecord> {
    const record = await this.applicationRepository.deleteWithDateApplication(
      id
    );
    return record;
  }
}
