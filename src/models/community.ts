import { Time } from "./etc";
import { User, UserRole } from "./User";

export enum PostStatus {
  Normal = "Normal",
  Deleted = "Deleted",
  Reported = "Reported",
}

export type Category = {
  id: string;
  name: string;
  description: string;
  reqPermission: string[];
  anonAble: boolean;
  readAbleRole: UserRole[];
  writeAbleRole: UserRole[];
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  createAt: Time;
  updateAt: Time;
  status: PostStatus;
};

export type Posts = {
  id: string;
  author: User;
  title: string;
  content?: string;
  createAt: Time;
  updateAt: Time;
  like?: number;
  isLike?: boolean;
  category?: Category;
  comment?: Comment[];
  status: PostStatus;
};
