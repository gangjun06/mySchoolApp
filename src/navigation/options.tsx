import { Ionicons } from "@expo/vector-icons";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../constants";

export const BasicHeader: StackNavigationOptions = {
  headerLeft: (props) => (
    <TouchableOpacity onPress={() => props.onPress && props.onPress()}>
      <Ionicons name="chevron-back-outline" size={28} />
    </TouchableOpacity>
  ),
  headerStyle: {
    // height: theme.sizes.base * 4,
    borderBottomColor: "transparent",
    shadowColor: "transparent",
    borderBottomWidth: 0,
    backgroundColor: "#ffffff",
    elevation: 0,
  },
  // headerTransparent: true,
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    alignItems: "center",
    marginLeft: theme.sizes.base,
    paddingRight: theme.sizes.base,
  },
  headerRightContainerStyle: {
    alignItems: "center",
    paddingRight: theme.sizes.base,
  },
};
