import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import { Button, Block, Input, Text } from "../../components/basic";
import { Formik } from "formik";
import { AuthContext } from "../../components/providers/AuthProvider";
import { theme } from "../../constants";
import { AuthNavProps } from "../../navigation/AuthParamList";
import { Container } from "../../components/containers";
import { TextInput } from "react-native-gesture-handler";
import * as Yup from "yup";

type SigninInput = {
  phone: string;
  password: string;
};

const SigninSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/010[\d]{8}/, "올바르지 않은 전화번호 입니다.")
    .required("전화번호를 입력하여주세요"),
  password: Yup.string()
    .min(8, "올바른 비밀번호를 입력하여 주세요")
    .max(32, "올바른 비밀번호를 입력하여 주세요")
    .required("비밀번호를 입력하여주세요"),
});

export const LoginScreen: React.FC<AuthNavProps<"SignUp">> = ({
  navigation,
}) => {
  const { login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const initialValue: SigninInput = {
    phone: "01000000000",
    password: "asdf0000",
  };

  const onSubmit = (data: SigninInput) => {
    if (loading) return;
    login();
  };

  return (
    <Container centerItem keyboardAvoid title="로그인">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={SigninSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Input
              label="전화번호"
              error={touched.phone && errors.phone}
              keyboardType={"number-pad"}
              autoFocus
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
            />
            <Input
              label="비밀번호"
              secure
              error={touched.password && errors.password}
              keyboardType={"default"}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            <Button gradient onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>
          </>
        )}
      </Formik>

      <Button onPress={() => navigation.navigate("Splash")}>
        <Text gray caption center style={{ textDecorationLine: "underline" }}>
          비밀번호를 잊으셨나요?
        </Text>
      </Button>
    </Container>
  );
};
