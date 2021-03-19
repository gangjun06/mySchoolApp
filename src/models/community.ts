import { Time } from "./etc";
import { User, UserRole } from "./User";

export type Category = {
  id: string;
  name: string;
  description: string;
  reqPermission: string[];
  anonAble: boolean;
  readAbleRole: UserRole[];
  writeAbleRole: UserRole[];
};

export type Posts = {
  id: string;
  author: User;
  title: string;
  createAt: Time;
  updateAt: Time;
};
