import React from "react";
import { Text } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/Home/Home";
import { AppParamList, HomeNavProps, HomeParamList } from "./ParamList";
import { MealScreen } from "../screens/home/Home/Meal";
import { CalendarScreen } from "../screens/home/Home/Calendar";
import { ScheduleScreen } from "../screens/home/Home/Schedule";
import { theme } from "../constants";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"Main">) => {
  return (
    <Stack.Navigator>
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
        component={MealScreen}
        options={({ route }) => ({
          headerTitle: "시간표",
        })}
      />
      <Stack.Screen
        name="Calendar"
        component={MealScreen}
        options={({ route }) => ({
          headerTitle: "학사일정",
        })}
      />
    </Stack.Navigator>
  );
};
