import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "../../components/AuthProvider";
import { AuthNavProps } from "../../navigation/AuthParamList";

export const SignUpScreen: React.FC<AuthNavProps<"Register">> = ({}) => {
  const { login } = useContext(AuthContext);
  return (
    <SafeAreaProvider>
      <TouchableOpacity onPress={login}>
        <Text>signin</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};
