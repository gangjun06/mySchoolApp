import React, { useEffect, useState } from "react";
import { Container } from "../../../components/containers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Block, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format, addDays, subDays } from "date-fns";

export const MealScreen = () => {
  const [isPickerVisible, setePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [mealData, setMealData] = useState<null>(null);

  const dateAdd = () => setDate(addDays(date, 1));
  const dateSub = () => setDate(subDays(date, 1));

  const showDatePicker = () => setePickerVisible(true);
  const hideDatePicker = () => setePickerVisible(false);

  const handleConfirmPicker = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  useEffect(() => {}, [date]);

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
          <Text h3>{format(date, "yyyy/MM/dd")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dateAdd} style={{ padding: 5 }}>
          <Feather name="chevron-right" size={24} />
        </TouchableOpacity>
      </Block>
    </Container>
  );
};
