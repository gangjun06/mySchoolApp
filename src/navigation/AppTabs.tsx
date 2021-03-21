import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./ParamList";
import { HomeScreen } from "../screens/home/Home/Home";
import { CommunityScreen } from "../screens/home/Community/Community";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../constants";

import { Block, Button, Text } from "../components/basic";
import { HomeStack } from "./HomeStack";
import { CommunityStack } from "./CommunityStack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { EtcScreen } from "../screens/home/Etc/Etc";
import { EtceStack } from "./EtcStack";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserStatus } from "../models/User";

import Modal from "react-native-modal";

import ApproveImg from "../../assets/images/approve.svg";
import CancelImg from "../../assets/images/cancel.svg";
import { Dimensions } from "react-native";
import { Container } from "../components/containers";
import { openWeb, URL_SUPPORT } from "../utils/web";
import {
  NavigationContainer,
  RouteProp,
  useRoute,
} from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  const { user } = useContext(AuthContext);

  const RenderScreen = () => {
    switch (user?.status) {
      case UserStatus.user:
        return <Navigator />;
      case UserStatus.wait:
        return <WaitScreen />;
      case UserStatus.ban:
        return <BanScreen />;
      default:
        return <ErrorScreen />;
    }
  };

  return <>{user.name !== "" && <RenderScreen />}</>;
};

const WaitScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <Block center middle flex>
        <ApproveImg width={width} height={height / 3} />
        <Block margin={[theme.sizes.base, 0, 0, 0]} center>
          <Text h1 primary center bold>
            가입 승인 대기중입니다
          </Text>
          <Text body center gray2 style={{ marginTop: theme.sizes.base / 2 }}>
            24시간 이내로 진행되니{"\n"}조금만 기다려주시기 바랍니다.
          </Text>
        </Block>
      </Block>

      <Block middle margin={[0, theme.sizes.base]}>
        <Button gradient onPress={logout}>
          <Text center semibold white>
            로그아웃
          </Text>
        </Button>
        <Button shadow onPress={() => openWeb(URL_SUPPORT)}>
          <Text center semibold>
            문의하기
          </Text>
        </Button>
      </Block>
    </Container>
  );
};
const BanScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <Block center middle flex>
        <CancelImg width={width} height={height / 3} />
        <Block margin={[theme.sizes.base, 0, 0, 0]} center>
          <Text h1 primary center bold>
            계정이 정지되었습니다
          </Text>
          <Text body center gray2 style={{ marginTop: theme.sizes.base / 2 }}>
            문제가 될 행동을 하거나{"\n"}가입시 잘못된 정보를 기입하셨습니다
            {"\n"}자세한 사항은 아래를 통하여 문의하여 주세요
          </Text>
        </Block>
      </Block>

      <Block middle margin={[0, theme.sizes.base]}>
        <Button gradient onPress={logout}>
          <Text center semibold white>
            로그아웃
          </Text>
        </Button>
        <Button shadow onPress={() => openWeb(URL_SUPPORT)}>
          <Text center semibold>
            문의하기
          </Text>
        </Button>
      </Block>
    </Container>
  );
};

const ErrorScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <Block center middle flex>
        <Block margin={[theme.sizes.base, 0, 0, 0]} center>
          <Text h1 primary center bold>
            뭔가 문제가 생겼습니다
          </Text>
          <Text body center gray2 style={{ marginTop: theme.sizes.base / 2 }}>
            사용자의 데이터 꼬인것 같습니다{"\n"}다시한번 시도해보고, 문제가
            지속된다면{"\n"}아래를 통하여 문의해주시기 바랍니다
          </Text>
        </Block>
      </Block>

      <Block middle margin={[0, theme.sizes.base]}>
        <Button gradient onPress={logout}>
          <Text center semibold white>
            로그아웃
          </Text>
        </Button>
        <Button shadow onPress={() => openWeb(URL_SUPPORT)}>
          <Text center semibold>
            문의하기
          </Text>
        </Button>
      </Block>
    </Container>
  );
};

const HideTabList = ["List", "Detail", "Write"];

const Navigator = () => {
  return (
    <NavigationContainer
      //@ts-ignore
      theme={{ colors: { background: "white", border: theme.colors.gray2 } }}
    >
      <Tabs.Navigator
        //@ts-ignore
        screenOptions={({ route, navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: stackState } = routes[index];
          let tabBarVisible: Boolean = true;
          if (stackState) {
            const { routes: stackRoutes, index: stackIndex } = stackState;
            const activeRoute = stackRoutes[stackIndex];
            tabBarVisible = !HideTabList.includes(activeRoute.name);
          }
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: typeof Feather["prototype"]["name"] = "help-circle";

              if (route.name === "Home") iconName = "home";
              else if (route.name === "Community") iconName = "edit";
              else if (route.name === "Etc") iconName = "list";

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.name)}
                >
                  <Feather name={iconName} size={size} color={color} />
                </TouchableOpacity>
              );
            },
            tabBarLabel: () => {
              return;
            },
            tabBarVisible,
          };
        }}
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.gray,
        }}
      >
        <Tabs.Screen name="Home" component={HomeStack} />
        <Tabs.Screen name="Community" component={CommunityStack} />
        <Tabs.Screen name="Etc" component={EtceStack} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
