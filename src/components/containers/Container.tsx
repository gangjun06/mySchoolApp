import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Block, Text } from "../../components/basic";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { theme } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

interface ContainerProps {
  centerItem?: boolean;
  keyboardAvoid?: boolean;
  scroll?: boolean;
  title?: string | null;
  subtitle?: string | null;
  padding?: boolean;
  safearea?: boolean;
  rightItem?: React.ReactElement;
  refreshControl?: React.ReactElement;
  horizontalPadding?: boolean;
  paddingBottom?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  centerItem = false,
  keyboardAvoid = false,
  scroll = false,
  title = null,
  subtitle = null,
  padding = false,
  safearea = true,
  rightItem = <></>,
  refreshControl = <></>,
  horizontalPadding = true,
  paddingBottom = true,
  children,
}) => {
  const style: StyleProp<ViewStyle> = [
    styles.container,
    centerItem && styles.center,
    padding && { paddingTop: theme.sizes.base * 2 },
    { backgroundColor: "#ffffff" },
    // { backgroundColor: "#F5F5F8" },
  ];

  const Children = () => {
    return (
      <Block flex padding={[0, horizontalPadding ? theme.sizes.base * 2 : 0]}>
        {title && (
          <Block flex={false} space="between" row center>
            <Block>
              <Text h1 bold>
                {title}
              </Text>
              {subtitle && (
                <Block margin={[theme.sizes.base / 2, 0, 0, 0]}>
                  <Text gray>{subtitle}</Text>
                </Block>
              )}
            </Block>
            {rightItem}
          </Block>
        )}

        <Block
          flex
          padding={[
            title ? theme.sizes.base * 1.5 : 0,
            0,
            paddingBottom ? theme.sizes.base * 1.5 : 0,
            0,
          ]}
          middle={centerItem ? true : false}
        >
          {children}
        </Block>
      </Block>
    );
  };
  if (keyboardAvoid && scroll) {
    return (
      <KeyboardAwareScrollView style={style}>
        <Children />
      </KeyboardAwareScrollView>
    );
  }
  if (scroll) {
    return (
      <ScrollView style={style} refreshControl={refreshControl}>
        <Children />
      </ScrollView>
    );
  }
  if (keyboardAvoid) {
    return (
      <KeyboardAvoidingView
        style={style}
        keyboardVerticalOffset={Platform.OS == "ios" ? 10 : 0}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Children />
      </KeyboardAvoidingView>
    );
  }
  if (safearea) {
    return (
      <SafeAreaView style={style}>
        <Children />
      </SafeAreaView>
    );
  }

  return (
    <Block style={style}>
      <Children />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  center: {
    justifyContent: "center",
  },
});
