import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/Home";
import { HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();

interface HomeStackProps {}

export const HomeStack: React.FC<HomeStackProps> = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
