import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
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
import { AuthContext } from "../components/providers/AuthProvider";
import { AppTabs } from "./AppTabs";
import { SignUpScreen } from "../screens/auth/SignUp";
import { LoginScreen } from "../screens/auth/Login";
import { SplashScreen } from "../screens/auth/Splash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerLeft: (props) => (
                <View
                  style={{
                    zIndex: 99999,
                    position: "absolute",
                    left: -13,
                    top: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => props.onPress && props.onPress()}
                  >
                    <Ionicons name="chevron-back-outline" size={28} />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                height: theme.sizes.base * 4,
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
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base,
              },
              headerRightContainerStyle: {
                alignItems: "center",
                paddingRight: theme.sizes.base,
              },
            }}
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
    );
  }
};
