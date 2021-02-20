import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  ActivityIndicatorBase,
  ActivityIndicator,
} from "react-native";
import { AuthNavProps, AuthParamList } from "./AuthParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/AuthProvider";
import { AppTabs } from "./AppTabs";
import { SignUpScreen } from "../screens/auth/SignUp";
import { SplashScreen } from "../screens/auth/Splash";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Splash({}: AuthNavProps<"Splash">) {
  return (
    <View>
      <Text>splash</Text>
    </View>
  );
}
function Login() {
  return (
    <View>
      <Text>asdf</Text>
    </View>
  );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, profileByToken } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userToken) => {
        if (userToken) {
          profileByToken(userToken);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <ActivityIndicator />
      </>
    );
  } else {
    return (
      <NavigationContainer>
        <StatusBar />
        {user ? (
          <AppTabs />
        ) : (
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SignUpScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
};
