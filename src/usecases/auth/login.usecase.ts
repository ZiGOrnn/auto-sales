import { RecordAuthResponse } from "pocketbase";
import { UserRecord } from "../../repositories/auth/types/userRecord";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../../repositories/auth/user.repository";
import { Login } from "../../repositories/types/collection";

export interface LoginUsecase {
  execute(payload: Login): Promise<RecordAuthResponse<UserRecord>>;
}

export class LoginUsecaseImpl implements LoginUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository = new UserRepositoryImpl()) {
    this.userRepository = userRepository;
  }

  async execute(payload: Login): Promise<RecordAuthResponse<UserRecord>> {
    const record = await this.userRepository.login(payload);
    return record;
  }
}
