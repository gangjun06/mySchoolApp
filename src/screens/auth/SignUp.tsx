import React, { useContext } from "react";
import { View } from "react-native";
import { Container } from "../../components/containers";
import { AuthContext } from "../../components/providers/AuthProvider";
import { AuthNavProps } from "../../navigation/AuthParamList";

export const SignUpScreen: React.FC<AuthNavProps<"SignUp">> = ({}) => {
  return <Container title="회원가입" keyboardAvoid scroll></Container>;
};
