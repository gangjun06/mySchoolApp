import { Formik, FormikHelpers } from "formik";
import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Block,
  Input,
  Text,
  Button,
  Dropdown,
} from "../../../components/basic";
import { theme } from "../../../constants";
import * as Yup from "yup";
import { useMutation } from "react-apollo";
import {
  SetProfileOfficialsReq,
  SetProfileRes,
  SetProfileStudentReq,
  SetProfileTeacherReq,
  SET_PROFILE_OFFICIALS,
  SET_PROFILE_STUDENT,
  SET_PROFILE_TEACHER,
} from "../../../graphql/mutations";
import { SignUpContext } from "./Context";
import * as errs from "../../../graphql/errors";

type StudentForm = {
  name: string;
  grade: string;
  class: string;
  number: string;
};
const StudentFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[가-힣]{2,4}$/, "올바른 이름을 입력하여 주세요")
    .required("이름을 입력하여 주세요."),
  grade: Yup.string().required("학년을 입력하여 주세요"),
  class: Yup.string()
    .is(["1", "2", "3", "4", "5"], "올바른 반을 입력하여 주세요")
    .required("반을 입력하여 주세요"),
  number: Yup.string()
    .matches(/^[\d]{1,2}$/, "올바른 이름을 입력하여 주세요")
    .required("번호를 입력하여 주세요"),
});

type TeacherForm = {
  name: string;
  subject: string;
};
const TeacherFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[가-힣]{2,4}$/, "올바른 이름을 입력하여 주세요")
    .required("이름을 입력하여 주세요."),
  subject: Yup.string()
    .matches(
      /^([가-힣]{2,4})(\s[가-힣]{2,4})?(\s[가-힣]{2,4})?$/,
      "과목을 띄어쓰기 기준으로 적어주세요. 최대 3개, 최소 1개. (입력예: 역사 도덕)"
    )
    .required("담당 과목을 입력하여주세요"),
});

type OfficialsForm = {
  name: string;
  role: string;
};
const OfficialsFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[가-힣]{2,4}$/, "올바른 이름을 입력하여 주세요")
    .required("이름을 입력하여 주세요."),
  role: Yup.string()
    .matches(/^[가-힣\s]{2,10}$/, "2자이상 10자 이내로 적어주세요")
    .required("역할을 입력하여 주세요."),
});

export const RoleSection = ({}) => {
  const tabs: string[] = ["학생", "선생님", "관계자"];
  const [active, setActive] = useState<string>("학생");
  const { setProfileCode, setPage, setName } = useContext(SignUpContext);
  const [setStudent] = useMutation<SetProfileRes, SetProfileStudentReq>(
    SET_PROFILE_STUDENT
  );
  const [setTeacher] = useMutation<SetProfileRes, SetProfileTeacherReq>(
    SET_PROFILE_TEACHER
  );
  const [setOfficials] = useMutation<SetProfileRes, SetProfileOfficialsReq>(
    SET_PROFILE_OFFICIALS
  );

  const onSubmitStudent = (
    values: StudentForm,
    formikHelpers: FormikHelpers<StudentForm>
  ) => {
    setStudent({
      variables: {
        grade: parseInt(values.grade),
        class: parseInt(values.class),
        number: parseInt(values.number),
      },
    })
      .then(({ data, errors }) => {
        if (!data) return;
        setProfileCode(data.setProfile);
        setName(values.name);
        setPage("phone");
      })
      .catch((error) => {
        const err = error.graphQLErrors;
        if (err.length > 0) {
          if (err[0].extensions.code === errs.Duplicate)
            alert("이미 같은 전화번호가 등록되어 있습니다");
          else alert("알 수 없는 에러가 발생하였습니다");
        }
      });
  };
  const onSubmitTeacher = (
    values: TeacherForm,
    formikHelpers: FormikHelpers<TeacherForm>
  ) => {
    setTeacher({
      variables: {
        subject: values.subject.split(" "),
      },
    })
      .then(({ data, errors }) => {
        if (!data) return;
        setName(values.name);
        setProfileCode(data.setProfile);
        setPage("phone");
      })
      .catch((e) => {
        alert("에러가 발생하였습니다");
      });
  };
  const onSubmitOfficials = (
    values: OfficialsForm,
    formikHelpers: FormikHelpers<OfficialsForm>
  ) => {
    setOfficials({
      variables: {
        role: values.role,
      },
    })
      .then(({ data, errors }) => {
        if (!data) return;
        setName(values.name);
        setProfileCode(data.setProfile);
        setPage("phone");
      })
      .catch((e) => {
        alert("에러가 발생하였습니다");
      });
  };

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
        return <StudentSection onSubmit={onSubmitStudent} />;
      case "선생님":
        return <TeacherSection onSubmit={onSubmitTeacher} />;
      case "관계자":
        return <OfficialsSection onSubmit={onSubmitOfficials} />;
    }
  };
  return (
    <Block>
      <Block flex={false} row style={styles.tabs}>
        {tabs.map((tab) => renderTab(tab))}
      </Block>
      {renderForm(active)}
    </Block>
  );
};

const StudentSection = ({
  onSubmit,
}: {
  onSubmit: (
    values: StudentForm,
    formikHelpers: FormikHelpers<StudentForm>
  ) => void | Promise<any>;
}) => {
  const initialValueStudent: StudentForm = {
    name: "",
    grade: "",
    class: "",
    number: "",
  };
  return (
    <Formik
      initialValues={initialValueStudent}
      onSubmit={onSubmit}
      validationSchema={StudentFormSchema}
    >
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Block>
          <Input
            label="이름"
            error={touched.name && errors.name}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="이름을 입력하여주세요"
          />
          <Dropdown
            label="학년"
            error={touched.grade && errors.grade}
            items={[
              { label: "1학년", value: "1" },
              { label: "2학년", value: "2" },
              { label: "3학년", value: "3" },
            ]}
            zIndex={5000}
            onChangeItem={(value) => setFieldValue("grade", value.value)}
            placeholder="학년을 선택하여 주세요"
          />
          <Dropdown
            label="반"
            error={touched.class && errors.class}
            items={[
              { label: "인(1반)", value: "1" },
              { label: "의(2반)", value: "2" },
              { label: "예(3반)", value: "3" },
              { label: "지(4반)", value: "4" },
              { label: "신(5반)", value: "5" },
            ]}
            zIndex={4000}
            onChangeItem={(value) => setFieldValue("class", value.value)}
            placeholder="반을 선택하여 주세요"
          />
          <Input
            label="번호"
            error={touched.number && errors.number}
            value={values.number}
            onChangeText={handleChange("number")}
            onBlur={handleBlur("number")}
            keyboardType={"number-pad"}
            placeholder="번호를 입력하여 주세요"
          />
          <Button gradient onPress={handleSubmit}>
            <Text bold white center>
              다음단계
            </Text>
          </Button>
        </Block>
      )}
    </Formik>
  );
};

const TeacherSection = ({
  onSubmit,
}: {
  onSubmit: (
    values: TeacherForm,
    formikHelpers: FormikHelpers<TeacherForm>
  ) => void | Promise<any>;
}) => {
  const initialValue: TeacherForm = {
    name: "",
    subject: "",
  };
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={TeacherFormSchema}
    >
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Block>
          <Input
            label="이름"
            error={touched.name && errors.name}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="이름을 입력하여주세요"
          />
          <Input
            label="담당 과목"
            error={touched.subject && errors.subject}
            value={values.subject}
            onChangeText={handleChange("subject")}
            onBlur={handleBlur("subject")}
            placeholder="담당 과목을 입력하여 주세요"
          />
          <Button gradient onPress={handleSubmit}>
            <Text bold white center>
              다음단계
            </Text>
          </Button>
        </Block>
      )}
    </Formik>
  );
};

const OfficialsSection = ({
  onSubmit,
}: {
  onSubmit: (
    values: OfficialsForm,
    formikHelpers: FormikHelpers<OfficialsForm>
  ) => void | Promise<any>;
}) => {
  const initialValue: OfficialsForm = {
    name: "",
    role: "",
  };
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={OfficialsFormSchema}
    >
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Block>
          <Input
            label="이름"
            error={touched.name && errors.name}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="이름을 입력하여주세요"
          />
          <Input
            label="역할"
            error={touched.role && errors.role}
            value={values.role}
            onChangeText={handleChange("role")}
            onBlur={handleBlur("role")}
            placeholder="예:행정실장, 상담교사 등..."
          />
          <Button gradient onPress={handleSubmit}>
            <Text bold white center>
              다음단계
            </Text>
          </Button>
        </Block>
      )}
    </Formik>
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
