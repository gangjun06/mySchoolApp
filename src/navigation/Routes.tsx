import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
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

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

const Loading = () => (
  <Block flex middle center>
    <ActivityIndicator />
  </Block>
);

const Profile: React.FC = ({ children }) => {
  const { setUser, isAuth, logout } = useContext(AuthContext);
  if (!isAuth) {
    return <>{children}</>;
  }
  const { loading, error, data } = useQuery<GetMyProfileRes, {}>(
    GET_MY_PROFILE,
    {
      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    if (loading || error || !data) return;
    setUser(data.myProfile);
  }, [data]);
  useEffect(() => {
    if (error) logout();
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <Block flex middle center>
        <Text>요청도중 에러가 발생하였습니다</Text>
      </Block>
    );
  }
  return <>{children}</>;
};

export const Routes: React.FC<RoutesProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(async (userToken) => {
        if (userToken) {
          await login(userToken);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Profile>
        <NavigationContainer>
          <StatusBar />
          {user.name !== "" ? (
            <AppTabs />
          ) : (
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerLeft: (props) => (
                  <TouchableOpacity
                    onPress={() => props.onPress && props.onPress()}
                  >
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
      </Profile>
    );
  }
};
