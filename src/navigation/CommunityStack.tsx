import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CommunityParamList } from "./ParamList";
import { CommunityScreen } from "../screens/home/Community";

const Stack = createStackNavigator<CommunityParamList>();

interface CommunityStackProps {}

export const CommunityStack: React.FC<CommunityStackProps> = ({}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Community"
      component={CommunityScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
