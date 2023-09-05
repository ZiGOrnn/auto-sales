import { ListResult } from "pocketbase";
import { UserRecord } from "../../repositories/auth/types/userRecord";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../../repositories/auth/user.repository";

export interface GetListUsersUsecase {
  execute(
    userId: string,
    page?: number,
    limit?: number
  ): Promise<ListResult<UserRecord>>;
}

export class GetListUsersUsecaseImpl implements GetListUsersUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository = new UserRepositoryImpl()) {
    this.userRepository = userRepository;
  }

  async execute(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ListResult<UserRecord>> {
    const records = await this.userRepository.getList(userId, page, limit);
    return records;
  }
}
