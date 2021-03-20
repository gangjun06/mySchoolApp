import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AppNavProps, AppParamList, CommunityParamList } from "./ParamList";
import { CommunityScreen } from "../screens/home/Community/Community";
import { ListScreen } from "../screens/home/Community/List";
import { BasicHeader } from "./options";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PostDetailScreen } from "../screens/home/Community/PostDetail";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import { Block, Loading, Text } from "../components/basic";
import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator<CommunityParamList>();

export const CommunityStack = ({ navigation }: AppNavProps<"Community">) => {
  return (
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
      <Stack.Screen
        name="Detail"
        component={PostDetailScreen}
        options={({ route }) => ({
          headerTitle: "글 상세 내용",
        })}
      />
    </Stack.Navigator>
  );
};
