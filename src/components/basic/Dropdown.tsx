import React, { Component } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";

import { Text } from "./Text";
import { Block } from "./Block";
import { Button } from "./Button";
import { theme } from "../../constants";

export const Dropdown = (
  props: DropDownPickerProps & {
    label?: string;
    error?: any;
  }
) => {
  const {
    label = "",
    error = null,
    style,
    items,
    defaultValue,
    zIndex,
    onChangeItem,
    placeholder,
  } = props;

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

  const inputStyles: StyleProp<ViewStyle> = [
    styles.input,
    error ? styles.inputError : {},
    style,
  ];

  return (
    <Block flex={false} margin={[theme.sizes.base, 0]}>
      <RenderLabel />
      <Block
        style={{
          ...(Platform.OS !== "android" && {
            zIndex: 10,
          }),
        }}
      >
        <DropDownPicker
          style={inputStyles}
          labelStyle={{ marginLeft: 0 }}
          containerStyle={styles.inputContainer}
          dropDownStyle={{ padding: 0 }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          items={items}
          zIndex={zIndex}
          onChangeItem={onChangeItem}
        />
      </Block>
      {error != null && (
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
  inputContainer: {
    height: theme.sizes.base * 3,
    marginVertical: 0,
  },
  input: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputError: {
    borderBottomColor: theme.colors.accent,
  },
});
