import React, { useContext, useState } from "react";
import { Container } from "../../../components/containers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Block, Card, Loading, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { format, addMonths, addDays } from "date-fns";
import { useQuery } from "react-apollo";
import {
  GetCalendarRes,
  GetCalendarReq,
  GET_CALENDAR,
  GET_SCHEDULE,
  GetScheduleRes,
  GetScheduleReq,
} from "../../../graphql/queries";
import Empty from "../../../../assets/images/empty.svg";
import { subMonths } from "date-fns/esm";
import { CalendarCard } from "../../../components/etc/CalendarCard";
import { AuthContext } from "../../../components/providers/AuthProvider";
import { UserRole } from "../../../models/User";
import { ScheduleCard } from "../../../components/etc/ScheduleCard";

const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export const ScheduleScreen = () => {
  const [dow, setDow] = useState<number>(new Date().getDate());

  const dowAdd = () => setDow((v) => (v + 1 > 6 ? 0 : v + 1));
  const dowSub = () => setDow((v) => (v + -1 < 0 ? 6 : v - 1));

  return (
    <Container safearea={false} padding scroll>
      <Card shadow style={{ borderRadius: 60 }}>
        <Block flex={false} row space="between" center>
          <TouchableOpacity onPress={dowSub}>
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <Text h3>{dayOfWeek[dow]}요일</Text>
          <TouchableOpacity onPress={dowAdd}>
            <Feather name="chevron-right" size={24} />
          </TouchableOpacity>
        </Block>
      </Card>
      <ScheduleContent dow={dow} />
    </Container>
  );
};

const ScheduleContent = ({ dow }: { dow: number }) => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery<GetScheduleRes, GetScheduleReq>(
    GET_SCHEDULE,
    {
      variables: {
        dow,
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
      <Block flex center middle>
        <Loading />
      </Block>
    );
  if (error)
    return (
      <Block flex center middle>
        <Text>로딩중 에러가 발생하였습니다</Text>
      </Block>
    );
  if (data && data.schedule.length < 1)
    return (
      <Block flex center middle>
        <Empty width={200} height={200} />
        <Text title bold>
          데이터가 존재하지 않습니다
        </Text>
      </Block>
    );

  return (
    <Block margin={[theme.sizes.base * 2, 0, theme.sizes.base, 0]}>
      {data?.schedule.map((d, index) => (
        <ScheduleCard data={d} key={index} mt={index !== 0} />
      ))}
    </Block>
  );
};
