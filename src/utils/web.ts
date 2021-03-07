import { Linking } from "react-native";

export const openWeb = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

export const URL_SUPPORT = "https://osang.xyz/support";
export const URL_PRIVACY = "https://osang.xyz/privacy";
export const URL_LICENSE = "https://osang.xyz/license/app";
