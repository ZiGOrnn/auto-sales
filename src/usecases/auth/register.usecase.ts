import { UserRecord } from "../../repositories/auth/types/userRecord";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../../repositories/auth/user.repository";
import { User } from "../../repositories/types/collection";

export interface RegisterUsecase {
  execute(payload: User): Promise<UserRecord>;
}

export class RegisterUsecaseImpl implements RegisterUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository = new UserRepositoryImpl()) {
    this.userRepository = userRepository;
  }

  async execute(payload: User): Promise<UserRecord> {
    const record = await this.userRepository.register(payload);
    return record;
  }
}
