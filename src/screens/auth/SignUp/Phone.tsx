import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import * as Yup from "yup";
import { Button, Input, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import {
  CHECK_VERIFY_PHONE,
  VerifyPhoneCheckReq,
  VerifyPhoneCheckRes,
  VerifyPhoneReq,
  VERIFY_PHONE,
} from "../../../graphql/mutations";
import * as errs from "../../../graphql/errors";
import { SignUpContext } from "./Context";

type Form = {
  phone: string;
  code: string;
};

const FormSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/010[\d]{8}/, "올바르지 않은 전화번호 입니다.")
    .required("전화번호를 입력하여주세요"),
});

export const PhoneSection = ({}) => {
  const initialValuePhone: Form = { phone: "", code: "" };
  const { setPhoneCode, setPage } = useContext(SignUpContext);

  const [verifyPhone, { loading }] = useMutation<{}, VerifyPhoneReq>(
    VERIFY_PHONE
  );
  const [verifyPhoneCode, { loading: loading2 }] = useMutation<
    VerifyPhoneCheckRes,
    VerifyPhoneCheckReq
  >(CHECK_VERIFY_PHONE);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit = (value: Form) => {
    setErrMsg("");
    if (isSent) {
      checkCode(value.phone, value.code);
    } else {
      sendCode(value.phone);
    }
  };

  const sendCode = (number: string) => {
    verifyPhone({
      variables: {
        number,
      },
    })
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => {
        const err = error.graphQLErrors;
        if (err.length > 0) {
          if (err[0].extensions.code === errs.ToManyReq)
            setErrMsg(
              "하루에 너무 많은 요청을 보내셨습니다. 내일 다시 시도해주세요"
            );
          else if (err[0].extensions.code === errs.Duplicate)
            setErrMsg("이미 같은 전화번호가 등록되어 있습니다");
          else setErrMsg("알 수 없는 에러가 발생하였습니다");
        }
      });
  };
  const checkCode = (number: string, code: string) => {
    verifyPhoneCode({
      variables: {
        number,
        code,
      },
    })
      .then(({ data }) => {
        if (!data) return;
        setPhoneCode(data.checkVerifyPhoneCode);
        setPage("password");
      })
      .catch((error) => {
        const err = error.graphQLErrors;
        if (err.length > 0) {
          if (err[0].extensions.code === errs.BadRequest)
            setErrMsg("인증번호가 일치하지 않습니다");
          else setErrMsg("알 수 없는 에러가 발생하였습니다");
        }
      });
  };

  return (
    <Formik
      initialValues={initialValuePhone}
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
        setFieldValue,
      }) => (
        <>
          <Input
            label="전화번호"
            error={touched.phone && errors.phone}
            keyboardType={"number-pad"}
            autoFocus
            value={values.phone}
            editable={!isSent}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            style={isSent && { color: theme.colors.gray }}
          />
          <Input
            label="인증코드"
            error={touched.code && errors.code}
            keyboardType={"number-pad"}
            autoFocus
            editable={isSent}
            placeholder={
              isSent
                ? "5분안에 입력하여 주세요"
                : "인증번호를 먼저 발송해주세요"
            }
            value={values.code}
            onChangeText={handleChange("code")}
            onBlur={handleBlur("code")}
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
          <Button gradient onPress={handleSubmit} loading={loading || loading2}>
            <Text bold white center>
              {isSent ? "인증하기" : "인증코드 전송"}
            </Text>
          </Button>
          {isSent && (
            <>
              <Button
                shadow
                onPress={() => {
                  setErrMsg("");
                  setFieldValue("code", "");
                  setIsSent(false);
                }}
              >
                <Text bold center>
                  전화번호 다시입력
                </Text>
              </Button>
              <Button shadow onPress={() => sendCode(values.phone)}>
                <Text bold center>
                  재발송
                </Text>
              </Button>
              <Text center gray2 style={{ marginTop: theme.sizes.base / 2 }}>
                인증번호는 하루에 최대 5번까지 발송 가능합니다
              </Text>
            </>
          )}
        </>
      )}
    </Formik>
  );
};
