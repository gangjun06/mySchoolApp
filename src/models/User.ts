export enum UserStatus {
  wait = "WAIT",
  user = "USER",
  ban = "BAN",
}
export enum UserRole {
  student = "StudentProfile",
  teacher = "TeacherProfile",
  officals = "OfficialsProfile",
}

export type User = {
  id?: string;
  name: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  detail?: {
    __typename: string;
    grade?: number;
    class?: number;
    number?: number;
    subject?: string[];
    role?: string;
  };
};
