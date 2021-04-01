export type Calendar = {
  id: string;
  title: string;
  day: number;
  description: string;
  icon: string;
};

export type Schedule = {
  grade: number;
  class: number;
  dow: number;
  period: number;
  subject: string;
  teacher: string;
  description: string;
  classRoom: string;
};
