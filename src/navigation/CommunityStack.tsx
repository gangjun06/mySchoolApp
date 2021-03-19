import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CommunityParamList } from "./ParamList";
import { CommunityScreen } from "../screens/home/Community/Community";
import { ListScreen } from "../screens/home/Community/List";
import { BasicHeader } from "./options";
import { RouteProp } from "@react-navigation/native";

const Stack = createStackNavigator<CommunityParamList>();

interface CommunityStackProps {}

export const CommunityStack: React.FC<CommunityStackProps> = ({}) => (
  <Stack.Navigator screenOptions={BasicHeader}>
    <Stack.Screen
      name="Community"
      component={CommunityScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="List"
      component={ListScreen}
      options={(props: {
        route: RouteProp<CommunityParamList, "List">;
        navigation: any;
      }) => ({
        headerShown: true,
        headerTitle: props.route.params.category.name,
      })}
    />
  </Stack.Navigator>
);
