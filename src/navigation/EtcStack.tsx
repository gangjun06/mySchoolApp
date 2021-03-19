import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EtcParamList, HomeNavProps } from "./ParamList";
import { EtcScreen } from "../screens/home/Etc/Etc";
import { SettingScreen } from "../screens/home/Etc/Settings";
import { BasicHeader } from "./options";
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
    </Stack.Navigator>
  );
};
