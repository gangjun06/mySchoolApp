import React, { useContext } from "react";
import { View, Text, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../components/AuthProvider";

export const HomeScreen: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ marginTop: 30 }}>
      <TouchableOpacity onPress={logout}>
        <Text>signout</Text>
      </TouchableOpacity>
    </View>
  );
};
