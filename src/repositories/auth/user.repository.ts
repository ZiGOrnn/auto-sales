import { ListResult, RecordAuthResponse } from "pocketbase";
import { pb } from "../../pocketbase/pb";
import { CollectionName, Login, User } from "../types/collection";
import { UserRecord } from "./types/userRecord";

export interface UserRepository {
  register(body: User): Promise<UserRecord>;
  login(body: Login): Promise<RecordAuthResponse<UserRecord>>;
  getUser(userId: string): Promise<UserRecord>;
  getList(
    userId: string,
    page: number,
    limit: number
  ): Promise<ListResult<UserRecord>>;
}

export class UserRepositoryImpl implements UserRepository {
  async register(body: User): Promise<UserRecord> {
    const record = await pb
      .collection(CollectionName.Users)
      .create<UserRecord>(body);
    return record;
  }

  async login(body: Login): Promise<RecordAuthResponse<UserRecord>> {
    const record = await pb
      .collection(CollectionName.Users)
      .authWithPassword<UserRecord>(body.username, body.password);
    return record;
  }

  async getUser(userId: string): Promise<UserRecord> {
    const record = await pb
      .collection(CollectionName.Users)
      .getOne<UserRecord>(userId);
    return record;
  }

  async logout() {
    pb.authStore.clear();
  }

  async getList(userId: string, page: number, limit: number) {
    const records = await pb
      .collection(CollectionName.Users)
      .getList<UserRecord>(page, limit, {
        filter: `id != '${userId}'`,
      });
    return records;
  }
}
