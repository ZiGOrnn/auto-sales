import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../repositories/application/application.repository";

export interface SearchApplicationByNameRepository {
  execute(search: string, page?: number, limit?: number): Promise<any>;
}

export class SearchApplicationByNameRepositoryImpl
  implements SearchApplicationByNameRepository
{
  private applicationRepository: ApplicationRepository;

  constructor(
    applicationRepository: ApplicationRepository = new ApplicationRepositoryImpl()
  ) {
    this.applicationRepository = applicationRepository;
  }

  async execute(
    search: string,
    page: number = 1,
    limit: number = 20
  ): Promise<any> {
    const records = await this.applicationRepository.searchApplicationByName(
      search,
      page,
      limit
    );
    return records;
  }
}
