import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { CreateApplicationRecord } from "../../repositories/application/types/createApplicationRecord";

export interface CreateApplicationUsecase {
  execute(payload: CreateApplicationRecord): Promise<ApplicationRecord>;
}

export class CreateApplicationUsecaseImpl implements CreateApplicationUsecase {
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(payload: CreateApplicationRecord): Promise<ApplicationRecord> {
    const recode = await this.applicationRepository.createApplication(payload);
    return recode;
  }
}
