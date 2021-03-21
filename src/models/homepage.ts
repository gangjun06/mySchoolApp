import { Time } from "./etc";

export enum HomepageBoardType {
  Notice = "Notice",
  Prints = "Prints",
  Rule = "Rule",
  EvaluationPlan = "EvaluationPlan",
  Administration = "Administration",
}

export type HomepageFiles = {
  name: string;
  download: string;
  preview: string;
};

export type HomepageList = {
  id: number;
  number: string;
  title: string;
  writtenBy: string;
  createAt: Time;
};

export type HomepageDetail = {
  id: number;
  title: string;
  writtenBy: string;
  createAt: Time;
  content: string;
  images: string[];
  files: HomepageFiles[];
};
