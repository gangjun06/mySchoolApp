import { gql } from "apollo-boost";

export interface VerifyPhoneReq {
  number: string;
}

export const VERIFY_PHONE = gql`
  mutation VerifyPhone($number: Phone!) {
    verifyPhone(number: $number)
  }
`;

export interface VerifyPhoneCheckReq {
  number: string;
  code: string;
}

export interface VerifyPhoneCheckRes {
  checkVerifyPhoneCode: string;
}

export const CHECK_VERIFY_PHONE = gql`
  mutation VerifyPhone($number: Phone!, $code: String!) {
    checkVerifyPhoneCode(number: $number, code: $code)
  }
`;

export interface SetProfileStudentReq {
  grade: number;
  class: number;
  number: number;
}
export interface SetProfileRes {
  setProfile: string;
}
export const SET_PROFILE_STUDENT = gql`
  mutation SetProfileTeacher($grade: Int!, $class: Int!, $number: Int!) {
    setProfile(student: { grade: $grade, class: $class, number: $number })
  }
`;

export interface SetProfileTeacherReq {
  subject: string[];
}
export const SET_PROFILE_TEACHER = gql`
  mutation SetProfileTeacher($subject: [String!]!) {
    setProfile(teacher: { subject: $subject })
  }
`;

export interface SetProfileOfficialsReq {
  role: string;
}
export const SET_PROFILE_OFFICIALS = gql`
  mutation SetProfileOfficials($role: String!) {
    setProfile(officials: { role: $role, description: "" })
  }
`;

export interface SignUpRes {
  signUp: {
    token: string;
  };
}
export interface SignUpReq {
  name: string;
  password: string;
  phone: string;
  detail: string;
}
export const SIGNUP = gql`
  mutation SignUp(
    $name: String!
    $password: String!
    $phone: SignUpPhoneCode!
    $detail: ProfileCode!
  ) {
    signUp(
      input: {
        name: $name
        nickname: ""
        password: $password
        phone: $phone
        detail: $detail
      }
    ) {
      token
    }
  }
`;

export interface SignInRes {
  signIn: {
    token: string;
  };
}
export interface SignInReq {
  phone: string;
  password: string;
}
export const SIGNIN = gql`
  mutation SignIn($phone: Phone!, $password: String!) {
    signIn(phone: $phone, password: $password) {
      token
    }
  }
`;

export interface LikePostReq {
  postID: string;
  status: boolean;
}
export interface LikePostRes {}
export const LIKE_POST = gql`
  mutation LikePost($postID: ObjectID!, $status: Boolean!) {
    likePost(input: { post: $postID, status: $status })
  }
`;

export interface PostCommentAddReq {
  postID: string;
  content: string;
  anon: boolean;
}
export interface PostCommentAddRes {}
export const ADD_COMMENT = gql`
  mutation AddComment($postID: ObjectID!, $content: String!, $anon: Boolean) {
    addComment(input: { post: $postID, content: $content, anon: $anon })
  }
`;

export interface PostCommentDeleteReq {
  postID: string;
  commentID: string;
}
export interface PostCommentDeleteRes {}
export const DELETE_COMMENT = gql`
  mutation DeleteComment($postID: ObjectID!, $commentID: ObjectID!) {
    deleteComment(postID: $postID, commentID: $commentID)
  }
`;
