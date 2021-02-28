import React, { useContext } from "react";
import { View, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { AuthContext } from "../../../components/providers/AuthProvider";

import { Block, Card, Text } from "../../../components/basic";
import { Feather, Ionicons } from "@expo/vector-icons";
import { theme } from "../../../constants";
import { EtcNavProps } from "../../../navigation/ParamList";

export const EtcScreen: React.FC<EtcNavProps<"Etc">> = ({ navigation }) => {
  const onPress = (category: string) => {};

  const RightItem = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Feather name="settings" size={24} />
    </TouchableOpacity>
  );

  return (
    <Container
      title="기타"
      scroll
      padding
      rightItem={<RightItem />}
    ></Container>
  );
};
