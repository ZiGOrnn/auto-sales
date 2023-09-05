import { Record } from "pocketbase";
import { pb } from "../pocketbase/pb";

export interface FileRepository {
  getUrl(
    record: Pick<Record, "id" | "collectionId" | "collectionName">,
    filename: string
  ): string;
}

export class FileRepositoryImpl implements FileRepository {
  getUrl(
    record: Pick<Record, "id" | "collectionId" | "collectionName">,
    filename: string
  ): string {
    return pb.files.getUrl(record, filename);
  }
}
