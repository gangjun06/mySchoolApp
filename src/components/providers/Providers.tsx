import React, { useEffect } from "react";
import { Routes } from "../../navigation/Routes";
import { AuthProvider } from "./AuthProvider";

import { ApolloProvider, useMutation } from "react-apollo";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { apolloClient } from "../../graphql/client";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { SetNotiReq, SetNotiRes, SET_NOTI_ID } from "../../graphql/mutations";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("알림권한은 설정에서 언제든 변경하실 수 있습니다");
      return;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

interface ProvidersProps {}
export const Providers: React.FC<ProvidersProps> = ({}) => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
  }, []);

  const handleNotification = (notification) => {};

  const handleNotificationResponse = (response) => {
    console.log(response);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <BottomSheetModalProvider>
          <Routes />
        </BottomSheetModalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
