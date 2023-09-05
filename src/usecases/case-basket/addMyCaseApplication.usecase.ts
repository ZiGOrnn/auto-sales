import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { UpdateMyCase } from "../../repositories/application/types/updateMyCase";

export interface AddMyCaseApplicationUsecase {
  execute(id: string, payload: UpdateMyCase): Promise<ApplicationRecord>;
}

export class AddMyCaseApplicationUsecaseImpl
  implements AddMyCaseApplicationUsecase
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(id: string, payload: UpdateMyCase): Promise<ApplicationRecord> {
    const record = await this.applicationRepository.updateMyCaseApplication(
      id,
      payload
    );
    return record;
  }
}
