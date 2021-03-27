import { Formik } from "formik";
import React, { useContext } from "react";
import { useMutation } from "react-apollo";
import * as Yup from "yup";
import { Button, Input, Text } from "../../../components/basic";
import { AuthContext } from "../../../components/providers/AuthProvider";
import { SIGNUP, SignUpReq, SignUpRes } from "../../../graphql/mutations";
import { SignUpContext } from "./Context";

interface Form {
  password: string;
  passwordConfirm: string;
}

const FormSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
      "최소 8자, 32자 이하, 하나 이상의 문자, 숫자, 특수문자가 포함되어야 합니다."
    )
    .required("비밀번호를 입력하여주세요"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "입력한 비밀번호와 같지 않습니다")
    .required("비밀번호 확인을 입력하여주세요"),
});

export const PasswordSection = () => {
  const { name, setPage, phoneCode, profileCode } = useContext(SignUpContext);
  const { login } = useContext(AuthContext);
  const initialValues: Form = { password: "", passwordConfirm: "" };
  const [signUp, { loading }] = useMutation<SignUpRes, SignUpReq>(SIGNUP);
  const onSubmit = (values: Form) => {
    signUp({
      variables: {
        name,
        phone: phoneCode,
        detail: profileCode,
        password: values.password,
      },
    })
      .then(({ data }) => {
        if (!data) return;
        login(data.signUp.token);
      })
      .catch((error) => {
        const err = error.graphQLErrors;
        alert("회원가입중 에러가 발생하였습니다");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FormSchema}
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
            label="비밀번호"
            error={touched.password && errors.password}
            autoFocus
            secure
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          <Input
            label="비밀번호 확인"
            secure
            error={touched.passwordConfirm && errors.passwordConfirm}
            value={values.passwordConfirm}
            onChangeText={handleChange("passwordConfirm")}
            onBlur={handleBlur("passwordConfirm")}
          />
          <Button gradient onPress={handleSubmit} loading={loading}>
            <Text bold center white>
              가입하기
            </Text>
          </Button>
        </>
      )}
    </Formik>
  );
};
