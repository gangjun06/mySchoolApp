import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/Home/Home";
import { HomeNavProps, HomeParamList } from "./ParamList";
import { MealScreen } from "../screens/home/Home/Meal";
import { CalendarScreen } from "../screens/home/Home/Calendar";
import { ScheduleScreen } from "../screens/home/Home/Schedule";
import { BasicHeader } from "./options";

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"Main">) => {
  return (
    <Stack.Navigator screenOptions={BasicHeader}>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Meal"
        component={MealScreen}
        options={({ route }) => ({
          headerTitle: "급식",
        })}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({ route }) => ({
          headerTitle: "시간표",
        })}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ route }) => ({
          headerTitle: "학사일정",
        })}
      />
    </Stack.Navigator>
  );
};
