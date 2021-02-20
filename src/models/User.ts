export enum UserStatus {
  wait = "wait",
  normal = "normal",
  ban = "ban",
}
export enum UserRole {
  student = "student",
  teacher = "teacher",
  officals = "officals",
}

export type User = {
  name: string;
  nickname?: string;
  role: UserRole;
  status: UserStatus;
};
