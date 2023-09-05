import { ApplicationRepository } from "../../repositories/application/application.repository";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";

interface GetNotificationUsecase {
  execute(userId: string): Promise<ApplicationRecord>;
}

export class GetNotificationUsecaseImpl implements GetNotificationUsecase {
  private applicationRepository: ApplicationRepository;
  constructor(applicationRepository: ApplicationRepository) {
    this.applicationRepository = applicationRepository;
  }

  execute(userId: string): Promise<ApplicationRecord> {
    throw new Error("Method not implemented.");
  }
}
