import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as Icon from "@expo/vector-icons";

import { Text } from "./Text";
import { Block } from "./Block";
import { Button } from "./Button";
import { theme } from "../../constants";

export const Input = (props: any & TextInput["props"]) => {
  const {
    label,
    error,
    secure,
    rightLabel,
    rightStyle,
    onRightPress,
    style,
    ...otherProps
  } = props;
  const [toggleSecure, setToggleSecure] = React.useState<boolean>(false);

  const RenderLabel = () => {
    return (
      <Block flex={false} margin={[0, 0, 0, 0]}>
        {label ? (
          <Text gray2={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  };

  const RenderToggle = () => {
    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure(!toggleSecure)}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon.Ionicons
            color={theme.colors.gray}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? "md-eye" : "md-eye-off"}
          />
        )}
      </Button>
    );
  };

  const RenderRight = () => {
    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputStyles = [styles.input, error && styles.inputError, style];

  return (
    <Block flex={false} margin={[theme.sizes.base, 0]}>
      <RenderLabel />
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        {...otherProps}
      />
      <RenderToggle />
      <RenderRight />

      {error && (
        <>
          <Block flex={false} margin={[4, 0, 0, 0]}>
            <Text accent>{error}</Text>
          </Block>
        </>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base * 3,
    marginVertical: 0,
  },
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
  inputError: {
    borderBottomColor: theme.colors.accent,
  },
});
