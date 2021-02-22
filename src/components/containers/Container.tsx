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

interface ContainerProps {
  centerItem?: boolean;
  keyboardAvoid?: boolean;
  scroll?: boolean;
  title?: string | null;
}

export const Container: React.FC<ContainerProps> = ({
  centerItem = false,
  keyboardAvoid = false,
  scroll = false,
  title = null,
  children,
}) => {
  const style: StyleProp<ViewStyle> = [
    centerItem && styles.center,
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
        <Block middle={centerItem ? true : false}>{children}</Block>
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
    <Block style={style}>
      <Children />
    </Block>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
});
