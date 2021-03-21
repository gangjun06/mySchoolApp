import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo";
import { View, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Block, Card, Text, Loading } from "../../../components/basic";
import { Container } from "../../../components/containers";
import { MealCard } from "../../../components/etc/MealCard";
import { AuthContext } from "../../../components/providers/AuthProvider";
import { theme } from "../../../constants";
import {
  GetSchoolMealReq,
  GetSchoolMealRes,
  GET_SCHOOLMEAL,
} from "../../../graphql/queries";
import { SchoolMealType } from "../../../models";
import { HomeNavProps, HomeParamList } from "../../../navigation/ParamList";

export const HomeScreen: React.FC<HomeNavProps<"Main">> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const navPage = (pageName: keyof HomeParamList) => {
    navigation.push(pageName);
  };
  return (
    <Container title="홈" padding>
      <Block margin={[theme.sizes.base / 2, 0, 0, 0]}>
        <HomeBlock
          title="오늘의 급식"
          onPress={() => navPage("Meal")}
          marginBottom
        >
          <Meal />
        </HomeBlock>
        <HomeBlock
          title="오늘의 시간표"
          onPress={() => navPage("Schedule")}
          marginBottom
        >
          <Schedule />
        </HomeBlock>
        <HomeBlock title="학사일정" onPress={() => navPage("Calendar")}>
          <Calendar />
        </HomeBlock>
      </Block>
    </Container>
  );
};

type HomeBlockProp = {
  title: string;
  marginBottom?: boolean;
  onPress: () => void;
};
const HomeBlock: React.FC<HomeBlockProp> = ({
  title,
  onPress,
  marginBottom = false,
  children,
}) => {
  return (
    <Block flex={false} margin={[0, 0, marginBottom ? theme.sizes.base : 0, 0]}>
      <Block
        flex={false}
        row
        space="between"
        center
        margin={[0, 0, theme.sizes.base, 0]}
      >
        <Text h2 bold>
          {title}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Block row flex={false} center>
            <Text secondary>자세히 보기</Text>
            <Feather
              name="chevron-right"
              size={theme.sizes.body}
              color={theme.colors.gray2}
            />
          </Block>
        </TouchableOpacity>
      </Block>
      {children}
    </Block>
  );
};

const Meal: React.FC = () => {
  const [date, seDate] = useState<Date>(new Date());
  const { loading, error, data } = useQuery<GetSchoolMealRes, GetSchoolMealReq>(
    GET_SCHOOLMEAL,
    {
      variables: {
        date: date.toISOString(),
        type: SchoolMealType.LUNCH,
      },
      fetchPolicy: "no-cache",
    }
  );
  if (loading)
    return (
      <Card shadow>
        <Block flex center centerV>
          <Loading />
        </Block>
      </Card>
    );
  if (error)
    return (
      <Card shadow>
        <Block flex={false}>
          <Text>로딩중 에러가 발생하였습니다</Text>
        </Block>
      </Card>
    );
  if (data && data.schoolMeal.length < 1)
    return (
      <Card shadow>
        <Block flex={false}>
          <Text body>데이터가 존재하지 않습니다</Text>
        </Block>
      </Card>
    );

  return (
    <Block>
      {data?.schoolMeal.map((d, index) => (
        <MealCard data={d} key={index} mt={false} />
      ))}
    </Block>
  );
};

const Schedule: React.FC = () => {
  return (
    <Card shadow>
      <Block flex={false}>
        <Text body>시간표는 4월부터 제공될 예정입니다</Text>
      </Block>
    </Card>
  );
};

const Calendar: React.FC = () => {
  return (
    <Card shadow>
      <Block flex={false}>
        <Text body>자세히보기를 클릭하여 확인하세요</Text>
      </Block>
    </Card>
  );
};
