import { UserRecord } from "../repositories/auth/types/userRecord";

export const USER: UserRecord = {
  id: "",
  collectionId: "",
  collectionName: "",
  username: "",
  verified: false,
  emailVisibility: false,
  email: "",
  created: new Date(),
  updated: new Date(),
  name: "",
  avatar: "",
};
