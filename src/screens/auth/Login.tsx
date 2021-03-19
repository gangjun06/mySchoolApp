import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import { Button, Block, Input, Text } from "../../components/basic";
import { Formik, FormikHelpers } from "formik";
import { AuthContext } from "../../components/providers/AuthProvider";
import { theme } from "../../constants";
import { AuthNavProps } from "../../navigation/AuthParamList";
import { Container } from "../../components/containers";
import { TextInput } from "react-native-gesture-handler";
import * as errs from "../../graphql/errors";
import * as Yup from "yup";
import { useMutation } from "react-apollo";
import { SIGNIN, SignInReq, SignInRes } from "../../graphql/mutations";

type SigninInput = {
  phone: string;
  password: string;
};

const SigninSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/010[\d]{8}/, "올바르지 않은 전화번호 입니다")
    .required("전화번호를 입력하여주세요"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      "올바른 비밀번호를 입력하여 주세요"
    )
    .required("비밀번호를 입력하여주세요"),
});

export const LoginScreen: React.FC<AuthNavProps<"SignUp">> = ({
  navigation,
}) => {
  const { login } = React.useContext(AuthContext);
  const [loginReq, { loading }] = useMutation<SignInRes, SignInReq>(SIGNIN);
  const initialValue: SigninInput = {
    phone: "",
    password: "",
  };
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit = (
    data: SigninInput,
    formikHelpers: FormikHelpers<SigninInput>
  ) => {
    if (loading) return;
    loginReq({
      variables: {
        phone: data.phone,
        password: data.password,
      },
    })
      .then((data) => {
        if (!data.data) return;
        login(data.data?.signIn.token);
      })
      .catch((error) => {
        const err = error.graphQLErrors;
        if (err.length > 0) {
          if (err[0].extensions.code === errs.NotFound)
            setErrMsg("등록되지 않은 전화번호입니다");
          else if (err[0].extensions.code === errs.PasswordWrong)
            setErrMsg("비밀번호가 일치하지 않습니다");
          else setErrMsg("알 수 없는 에러가 발생하였습니다");
        }
      });
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
            {errMsg !== "" && (
              <Text
                accent
                center
                style={{
                  marginBottom: theme.sizes.base / 2,
                }}
              >
                {errMsg}
              </Text>
            )}
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

      {/* <Button onPress={() => navigation.navigate("Splash")}>
        <Text gray caption center style={{ textDecorationLine: "underline" }}>
          비밀번호를 잊으셨나요?
        </Text>
      </Button> */}
    </Container>
  );
};
