import React, { useState } from "react";
import { Container } from "../../../components/containers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Block, Card, Loading, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format, addMonths } from "date-fns";
import { useQuery } from "react-apollo";
import {
  GetCalendarRes,
  GetCalendarReq,
  GET_CALENDAR,
} from "../../../graphql/queries";
import Empty from "../../../../assets/images/empty.svg";
import { subMonths } from "date-fns/esm";
import { CalendarCard } from "../../../components/etc/CalendarCard";

export const CalendarScreen = () => {
  const [isPickerVisible, setePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const dateAdd = () => setDate(addMonths(date, 1));
  const dateSub = () => setDate(subMonths(date, 1));

  const showDatePicker = () => setePickerVisible(true);
  const hideDatePicker = () => setePickerVisible(false);

  const handleConfirmPicker = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <Container safearea={false} padding>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirmPicker}
        onCancel={hideDatePicker}
      />
      <Card shadow style={{ borderRadius: "60" }}>
        <Block flex={false} row space="between" center>
          <TouchableOpacity onPress={dateSub}>
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePicker}>
            <Text h3>{format(date, "yyyy년 M월")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={dateAdd}>
            <Feather name="chevron-right" size={24} />
          </TouchableOpacity>
        </Block>
      </Card>
      <CalendarContent year={date.getFullYear()} month={date.getMonth() + 1} />
    </Container>
  );
};

const CalendarContent = ({ year, month }: { year: number; month: number }) => {
  const { loading, error, data } = useQuery<GetCalendarRes, GetCalendarReq>(
    GET_CALENDAR,
    {
      variables: {
        year,
        month,
      },
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
  if (data && data.calendar.length < 1)
    return (
      <Block flex center middle>
        <Empty width={200} height={200} />
        <Text title bold>
          데이터가 존재하지 않습니다
        </Text>
      </Block>
    );

  return (
    <Block margin={[theme.sizes.base * 2, 0, 0, 0]}>
      {data?.calendar.map((d, index) => (
        <CalendarCard data={d} key={index} mt={index === 0} />
      ))}
    </Block>
  );
};
