import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../../../components/containers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Block, Card, Loading, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format, addDays, subDays } from "date-fns";
import { useQuery } from "react-apollo";
import {
  GetSchoolMealReq,
  GET_SCHOOLMEAL,
  GetSchoolMealRes,
} from "../../../graphql/queries";
import { SchoolMealType } from "../../../models";
import Empty from "../../../../assets/images/empty.svg";
import { MealCard } from "../../../components/etc/MealCard";

const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export const MealScreen = () => {
  const [isPickerVisible, setePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const dateAdd = () => setDate(addDays(date, 1));
  const dateSub = () => setDate(subDays(date, 1));

  const showDatePicker = () => setePickerVisible(true);
  const hideDatePicker = () => setePickerVisible(false);

  const handleConfirmPicker = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <Container>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirmPicker}
        onCancel={hideDatePicker}
      />
      <Block flex={false} row space="between" center>
        <TouchableOpacity onPress={dateSub} style={{ padding: 5 }}>
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatePicker}>
          <Text h3>
            {format(date, "M월 d일") + " "}({dayOfWeek[date.getDay()]}요일)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dateAdd} style={{ padding: 5 }}>
          <Feather name="chevron-right" size={24} />
        </TouchableOpacity>
      </Block>
      <MealContent date={date} />
    </Container>
  );
};

const MealContent = ({ date }: { date: Date }) => {
  const { loading, error, data } = useQuery<GetSchoolMealRes, GetSchoolMealReq>(
    GET_SCHOOLMEAL,
    {
      variables: {
        date: date.toISOString(),
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
  if (data && data.schoolMeal.length < 1)
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
      {data?.schoolMeal.map((d, index) => (
        <MealCard data={d} key={index} mt={index === 0} />
      ))}
    </Block>
  );
};
