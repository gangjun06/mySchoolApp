import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthParamList } from "./ParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/providers/AuthProvider";
import { AppTabs } from "./AppTabs";
import { SignUpScreen } from "../screens/auth/SignUp/SignUp";
import { LoginScreen } from "../screens/auth/Login";
import { SplashScreen } from "../screens/auth/Splash";
import { theme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GetMyProfileRes, GET_MY_PROFILE } from "../graphql/queries";
import { useQuery } from "react-apollo";
import { Block, Text } from "../components/basic";
import { BasicHeader } from "./options";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

const Loading = () => (
  <Block flex middle center>
    <ActivityIndicator />
  </Block>
);

export const Routes: React.FC<RoutesProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { login, isAuth, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(async (userToken) => {
        if (userToken) await login(userToken);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading || authLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <StatusBar />
        <NavigationContainer
          independent={true}
          theme={{
            //@ts-ignore
            colors: { background: "white", border: theme.colors.gray2 },
          }}
        >
          {isAuth ? (
            <AppTabs />
          ) : (
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={BasicHeader}
            >
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerTitle: "",
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </>
    );
  }
};
