import React, { createContext, useContext, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Block, Button, Input, Text } from "../../components/basic";
import { Container } from "../../components/containers";
import { AuthContext } from "../../components/providers/AuthProvider";
import { AuthNavProps } from "../../navigation/AuthParamList";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../constants";
import { Formik } from "formik";
import * as Yup from "yup";

const { width } = Dimensions.get("window");

const SignupContext = createContext<{
  data: any;
  currentpage: string;
  setPage: (page: string) => void;
}>({ data: {}, currentpage: "", setPage: () => {} });

type FormPhone = {
  phone: string;
};

const FormPhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/010[\d]{8}/, "올바르지 않은 전화번호 입니다.")
    .required("전화번호를 입력하여주세요"),
});

export const SignUpScreen: React.FC<AuthNavProps<"SignUp">> = ({}) => {
  const [page, setPage] = useState<string>("role");

  const renderPage = (page: string) => {
    switch (page) {
      case "role":
        return <RolePage />;
      case "phone":
        return <PhonePage />;
    }
  };
  const renderPageTitle = (page: string) => {
    switch (page) {
      case "role":
        return "본인의 정보를 알려주세요";
      case "phone":
        return "본인확인을 위해 전화번호 인증을 진행햐여 주세요";
    }
  };

  return (
    <SignupContext.Provider
      value={{
        currentpage: page,
        data: {},
        setPage: (page: string) => setPage(page),
      }}
    >
      <Container title="회원가입">
        <Block margin={[4, 0, 0, 0]}>
          <Text gray>{renderPageTitle(page)}</Text>
          <Block margin={[8, 0, 0, 0]}>{renderPage(page)}</Block>
        </Block>
      </Container>
    </SignupContext.Provider>
  );
};

const PhonePage = ({}) => {
  const initialValuePhone: FormPhone = { phone: "" };

  const onSubmit = (value: FormPhone) => {};

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Formik
      initialValues={initialValuePhone}
      onSubmit={onSubmit}
      validationSchema={FormPhoneSchema}
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
          <Button gradient onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                인증하기
              </Text>
            )}
          </Button>
        </>
      )}
    </Formik>
  );
};

const RolePage = ({}) => {
  const tabs: string[] = ["학생", "선생님", "관계자"];
  const [active, setActive] = useState<string>("학생");

  const handleTab = (tab: string) => {
    setActive(tab);
  };
  const renderTab = (tab: string) => {
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderForm = (tab: string) => {
    switch (tab) {
      case "학생":
        return <></>;
    }
  };
  return (
    <Block flex={false} row style={styles.tabs}>
      {tabs.map((tab) => renderTab(tab))}
    </Block>
  );
};

const styles = StyleSheet.create({
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
});
