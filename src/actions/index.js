import axios from "axios";
import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_ERROR } from "./types";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { checkForUpdateAsync } from "expo-updates";

const backendUrl = "https://osangapi.gangjun.dev";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      let { name, password, teacher, grade, studentclass, number } = data;
      teacher = teacher ? 1 : 0;
      let info = {};
      if (!teacher) {
        info = {
          grade: parseInt(grade),
          class: parseInt(studentclass),
          class_number: parseInt(number),
        };
      }

      const res = await axios.post(backendUrl + "/users/signup", {
        name,
        password,
        ...info,
        teacher,
      });

      dispatch({ type: AUTH_SIGN_UP, payload: res.data.token });
      await AsyncStorage.setItem("token", res.data.token);
    } catch (err) {
      console.warn(err);
      dispatch({ type: AUTH_ERROR, payload: "ERROR" });
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const { name, password } = data;
      const res = await axios.post(backendUrl + "/users/signin", {
        name,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: { token: res.data.token, status: res.data.status },
      });
    } catch (err) {
      console.warn(err);
      dispatch({
        type: AUTH_ERROR,
        payload: "로그인 정보가 일치하지 않습니다",
      });
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(backendUrl + "/users/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: AUTH_SIGN_IN,
        payload: { token, status: res.data.status },
      });
    } catch (err) {
      console.warn("error CheckAuth: " + err);
      await AsyncStorage.removeItem("token");
      dispatch({
        type: AUTH_SIGN_OUT,
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("token");

    dispatch({
      type: AUTH_SIGN_OUT,
    });
  };
};
