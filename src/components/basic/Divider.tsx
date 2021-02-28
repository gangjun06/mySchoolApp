import React from "react";
import { StyleSheet } from "react-native";

import { Block } from "./Block";
import { theme } from "../../constants";

export const Divider = (props: any) => {
  const { color, style, ...otherProps } = props;
  const dividerStyles = [styles.divider, style];

  return (
    <Block
      color={color || theme.colors.gray2}
      style={dividerStyles}
      flex={false}
      {...otherProps}
    />
  );
};

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
