import { gql } from "apollo-boost";
import * as models from "../models";

export interface GetSchoolMealReq {
  date: string;
  type?: models.SchoolMealType;
}
export interface GetSchoolMealRes {
  schoolMeal: models.SchoolMeal[];
}
export interface GetSchoolMealVerboseRes {
  schoolMeal: models.SchoolMealVerbose[];
}

export const GET_SCHOOLMEAL = gql`
  query SchoolMeal($date: Timestamp!, $type: SchoolMealType) {
    schoolMeal(filter: { dateStart: $date, type: $type }) {
      type
      content
      calorie
    }
  }
`;

export const GET_SCHOOLMEAL_VERBOSE = gql`
  query SchoolMeal($date: Timestamp!) {
    schoolMeal(filter: { dateStart: $date }) {
      type
      content
      calorie
      nutrient
      origin
    }
  }
`;
