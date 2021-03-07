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

export interface GetCalendarReq {
  year: number;
  month: number;
}
export interface GetCalendarRes {
  calendar: models.Calendar[];
}

export const GET_CALENDAR = gql`
  query GetCalendar($year: Uint!, $month: Uint!) {
    calendar(filter: { year: $year, month: $month }) {
      id
      title
      description
      icon
      day
    }
  }
`;

export interface GetMyProfileRes {
  myProfile: models.User;
}

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
      id
      name
      phone
      detail {
        __typename
        ... on StudentProfile {
          grade
          class
          number
        }
        ... on TeacherProfile {
          subject
        }
        ... on OfficialsProfile {
          role
        }
      }
      status
    }
  }
`;
