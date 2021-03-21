import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Category, HomepageBoardType } from "../models";

export type AuthParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type AppParamList = {
  Home: undefined;
  Community: undefined;
  Etc: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: BottomTabNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

export type HomeParamList = {
  Main: undefined;
  Meal: undefined;
  Calendar: undefined;
  Schedule: undefined;
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

export type CommunityParamList = {
  Community: undefined;
  List: {
    category: Category;
  };
  Detail: {
    post: string;
  };
  Write: {
    category: Category;
    afterWrite: () => void;
  };
};

export type CommunityNavProps<T extends keyof CommunityParamList> = {
  navigation: StackNavigationProp<CommunityParamList, T>;
  route: RouteProp<CommunityParamList, T>;
};

export type EtcParamList = {
  Etc: undefined;
  Settings: undefined;
  BoardList: {
    board: HomepageBoardType;
    boardName: string;
  };
  Detail: {
    board: HomepageBoardType;
    id: number;
  };
};

export type EtcNavProps<T extends keyof EtcParamList> = {
  navigation: StackNavigationProp<EtcParamList, T>;
  route: RouteProp<EtcParamList, T>;
};
