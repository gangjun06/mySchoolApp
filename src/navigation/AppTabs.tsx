import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./ParamList";
import { HomeScreen } from "../screens/home/Home/Home";
import { CommunityScreen } from "../screens/home/Community/Community";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../constants";

import { Text } from "../components/basic";
import { HomeStack } from "./HomeStack";
import { CommunityStack } from "./CommunityStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: typeof Feather["prototype"]["name"] = "help-circle";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Community") iconName = "edit";
          else if (route.name === "Etc") iconName = "list";

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let labelName: string = route.name;
          if (route.name === "Home") labelName = "홈";
          else if (route.name === "Community") labelName = "커뮤니티";
          else if (route.name === "Etc") labelName = "전체";
          return (
            <Text style={{ fontSize: theme.sizes.caption, color }}>
              {labelName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.gray,
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Community" component={CommunityStack} />
      <Tabs.Screen name="Etc" component={HomeScreen} />
    </Tabs.Navigator>
  );
};
