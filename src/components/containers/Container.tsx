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

interface ContainerProps {
  centerItem?: boolean;
  keyboardAvoid?: boolean;
  scroll?: boolean;
  title?: string | null;
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  centerItem = false,
  keyboardAvoid = false,
  scroll = false,
  title = null,
  padding = false,
  children,
}) => {
  const style: StyleProp<ViewStyle> = [
    styles.container,
    centerItem && styles.center,
    padding && { paddingTop: theme.sizes.base * 2 },
    { backgroundColor: "#ffffff" },
  ];

  const Children = () => {
    return (
      <Block padding={[0, theme.sizes.base * 2]}>
        {title && (
          <Text h1 bold>
            {title}
          </Text>
        )}
        <Block
          padding={[theme.sizes.base * 1.5, 0]}
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

  return (
    <SafeAreaView style={style}>
      <Children />
    </SafeAreaView>
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
