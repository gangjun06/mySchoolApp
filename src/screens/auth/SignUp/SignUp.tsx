import React, { useState } from "react";
import { Container } from "../../../components/containers";
import { AuthNavProps } from "../../../navigation/ParamList";
import { PhoneSection } from "./Phone";
import { RoleSection } from "./Role";
import { PasswordSection } from "./Password";
import { SignUpContext } from "./Context";
import { PrivacySection } from "./Privacy";

export const SignUpScreen: React.FC<AuthNavProps<"SignUp">> = ({}) => {
  const [profileCode, setProfileCode] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [page, setPage] = useState<string>("privacy");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const renderPage = (page: string) => {
    switch (page) {
      case "role":
        return <RoleSection />;
      case "phone":
        return <PhoneSection />;
      case "password":
        return <PasswordSection />;
      case "privacy":
        return <PrivacySection />;
    }
  };
  const renderPageTitle = (page: string) => {
    switch (page) {
      case "role":
        return "본인의 정보를 알려주세요";
      case "phone":
        return "본인확인을 위해 전화번호 인증을 진행하여 주세요";
      case "password":
        return "로그인때 사용할 비밀번호를 입력하여 주세요.";
      case "privacy":
        return "오상중학교 서비스에 가입하시는것을 환영합니다";
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        currentpage: page,
        phoneCode: phoneCode,
        profileCode: profileCode,
        name: name,
        password: password,
        setPage: (page: string) => setPage(page),
        setName: (str: string) => setName(str),
        setPhoneCode: (str: string) => setPhoneCode(str),
        setProfileCode: (str: string) => setProfileCode(str),
        setPassword: (str: string) => setPassword(str),
      }}
    >
      <Container
        title="회원가입"
        subtitle={renderPageTitle(page)}
        scroll
        keyboardAvoid
      >
        {renderPage(page)}
      </Container>
    </SignUpContext.Provider>
  );
};
