import React from "react";
import { Container } from "../../../components/containers";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CommunityNavProps } from "../../../navigation/ParamList";
import { Button, Input, Text, Switch, Block } from "../../../components/basic";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_POST,
  CreatePostReq,
  CreatePostRes,
} from "../../../graphql/mutations";
import { theme } from "../../../constants";

type Form = {
  title: string;
  content: string;
  anon: boolean;
};

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "제목이 너무 짧습니다")
    .max(50, "최대 50글자까지 입력하실 수 있습니다")
    .required("제목을 입력하여 주세요"),
  content: Yup.string()
    .max(5000, "최대 3000글자까지 입력하실 수 있습니다")
    .required("내용을 입력하여 주세요"),
  anon: Yup.boolean(),
});

export const WritePostScreen: React.FC<CommunityNavProps<"Write">> = ({
  navigation,
  route,
}) => {
  const initialValue: Form = { title: "", content: "", anon: false };
  const [writePost, { loading }] = useMutation<CreatePostRes, CreatePostReq>(
    CREATE_POST
  );

  const onSubmit = (values: Form) => {
    writePost({
      variables: {
        categoryID: route.params.category.id,
        anon: values.anon,
        title: values.title,
        content: values.content,
      },
    }).then((res) => {
      navigation.pop();
      route.params.afterWrite();
    });
  };

  return (
    <Container safearea={false} padding>
      <Formik
        initialValues={initialValue}
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
              label="제목"
              error={touched.title && errors.title}
              placeholder={"제목을 입력하여 주세요"}
              maxLength={30}
              autoFocus
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
            />
            <Input
              label="내용"
              maxLength={5000}
              placeholder={
                "공유할 내용을 입력하여 주세요...\n5000자까지 입력 가능합니다"
              }
              error={touched.content && errors.content}
              value={values.content}
              onChangeText={handleChange("content")}
              multiline
              style={{ height: 100 }}
              onBlur={handleBlur("content")}
            />
            <Block
              row
              center
              space="between"
              style={{ marginTop: theme.sizes.base }}
            >
              <Text gray2>익명</Text>
              <Switch
                value={values.anon}
                onValueChange={(v) => setFieldValue("anon", v)}
                disable={!route.params.category.anonAble}
              />
            </Block>
            <Button
              gradient
              onPress={handleSubmit}
              loading={loading}
              style={{ marginTop: theme.sizes.base }}
            >
              <Text bold white center>
                작성하기
              </Text>
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
