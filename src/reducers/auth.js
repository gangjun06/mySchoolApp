import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
} from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  errorMessage: "",
  status: 0,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        errorMessage: "",
      };
    case AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        status: action.payload.status,
        errorMessage: "",
      };
    default:
      return state;
  }
};
