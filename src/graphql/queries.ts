import { gql } from "apollo-boost";
import * as models from "../models";
import { HomepageBoardType } from "../models/homepage";

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
      role
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

export interface GetCategoriesRes {
  categories: models.Category[];
}

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      reqPermission
      anonAble
      readAbleRole
      writeAbleRole
    }
  }
`;

export interface GetPostsReq {
  categoryID: string;
  offset?: number;
  limit?: number;
}
export interface GetPostsRes {
  posts: models.Posts[];
}

export const GET_POSTS = gql`
  query GetPosts($categoryID: ObjectID!, $offset: Int, $limit: Int) {
    posts(categoryID: $categoryID, offset: $offset, limit: $limit) {
      id
      author {
        id
        name
        detail {
          __typename
        }
      }
      title
      createAt
      updateAt
    }
  }
`;

export interface GetPostDetailReq {
  postID: string;
  commentOffset?: number;
  commentLimit?: number;
}
export interface GetPostDetailRes {
  post: models.Posts;
}

export const GET_POST_DETAIL = gql`
  query GetPostDetail(
    $postID: ObjectID!
    $commentOffset: Int
    $commentLimit: Int
  ) {
    post(
      id: $postID
      comment: { limit: $commentLimit, offset: $commentOffset }
    ) {
      id
      title
      like
      isLike
      content
      createAt
      updateAt
      status
      author {
        name
      }
      comment {
        id
        author {
          id
          name
          role
        }
        content
        createAt
        updateAt
        status
      }
    }
  }
`;

export interface GetHomepageListReq {
  board: models.HomepageBoardType;
  page: number;
}
export interface GetHomepageListRes {
  homepageList: models.HomepageList[];
}
export const GET_HOMEPAGE_LIST = gql`
  query($board: HomepageBoard!, $page: Uint!) {
    homepageList(filter: { board: $board, page: $page }) {
      id
      number
      title
      writtenBy
      createAt
    }
  }
`;
export interface GetHomepageDetailReq {
  board: models.HomepageBoardType;
  id: number;
}
export interface GetHomepageDetailRes {
  homepageDetail: models.HomepageDetail;
}

export const GET_HOMEPAGE_DETAIL = gql`
  query($board: HomepageBoard!, $id: Uint!) {
    homepageDetail(filter: { board: $board, id: $id }) {
      id
      title
      writtenBy
      createAt
      content
      images
      files {
        name
        download
        preview
      }
    }
  }
`;
