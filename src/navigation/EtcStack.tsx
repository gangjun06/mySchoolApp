import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EtcParamList, HomeNavProps } from "./ParamList";
import { EtcScreen } from "../screens/home/Etc/Etc";
import { SettingScreen } from "../screens/home/Etc/Settings";
import { BasicHeader } from "./options";
import { BoardListScreen } from "../screens/home/Etc/List";
import { BoardDetailScreen } from "../screens/home/Etc/BoardDetail";
const Stack = createStackNavigator<EtcParamList>();

export const EtceStack: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"Main">) => {
  return (
    <Stack.Navigator screenOptions={BasicHeader}>
      <Stack.Screen
        name="Etc"
        component={EtcScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={({ route }) => ({
          headerTitle: "설정",
        })}
      />
      <Stack.Screen
        name="BoardList"
        component={BoardListScreen}
        options={({ route }) => ({
          headerTitle: route.params.boardName,
        })}
      />
      <Stack.Screen
        name="Detail"
        component={BoardDetailScreen}
        options={({ route }) => ({
          headerTitle: "상세보기",
        })}
      />
    </Stack.Navigator>
  );
};
