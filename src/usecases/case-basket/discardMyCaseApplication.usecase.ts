import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";

export interface DiscardMyCaseApplicationUsecase {
  execute(id: string): Promise<ApplicationRecord>;
}

export class DiscardMyCaseApplicationUsecaseImpl
  implements DiscardMyCaseApplicationUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(id: string): Promise<ApplicationRecord> {
    const record = await this.applicationRepository.updateMyCaseApplication(
      id,
      {
        my_case: "",
      }
    );
    return record;
  }
}
