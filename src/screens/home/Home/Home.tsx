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
  GetScheduleReq,
  GetScheduleRes,
  GetSchoolMealReq,
  GetSchoolMealRes,
  GET_SCHEDULE,
  GET_SCHOOLMEAL,
} from "../../../graphql/queries";
import { SchoolMealType } from "../../../models";
import { UserRole } from "../../../models/User";
import { HomeNavProps, HomeParamList } from "../../../navigation/ParamList";

export const HomeScreen: React.FC<HomeNavProps<"Main">> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const navPage = (pageName: keyof HomeParamList) => {
    navigation.push(pageName);
  };
  return (
    <Container title="홈" padding scroll>
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
  const [date, seDate] = useState<Date>(new Date());
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery<GetScheduleRes, GetScheduleReq>(
    GET_SCHEDULE,
    {
      variables: {
        dow: date.getDay(),
        grade: user.detail.grade || 0,
        class: user.detail.class || 0,
        name:
          user.role === UserRole.teacher ? user.name.split("", 2).join("") : "",
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
  if (data && data.schedule.length < 1)
    return (
      <Card shadow>
        <Block flex={false}>
          <Text body>데이터가 존재하지 않습니다</Text>
        </Block>
      </Card>
    );

  return (
    <Card shadow>
      <Text>
        {user.role === UserRole.teacher
          ? data.schedule.map(
              (d, index) =>
                `${index !== 0 ? "\n" : ""}${
                  index === 4 ? "-----------------\n" : ""
                }${d.period}교시: ${d.subject} - ${d.classRoom} (${
                  d.grade
                }학년 ${d.class}반)`
            )
          : data.schedule.map(
              (d, index) =>
                `${index !== 0 ? "\n" : ""}${
                  index === 4 ? "-----------------\n" : ""
                }${d.period}교시: ${d.subject} - ${d.teacher} (${d.classRoom})`
            )}
        {}
      </Text>
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
