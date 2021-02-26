import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { Block } from "./Block";
import { theme } from "../../constants";

type props = {
  children: React.ReactElement;
};

export const Card = (props: props & any) => {
  const {
    color,
    style,
    children,
    marginBottom,
    flex = false,
    ...otherProps
  } = props;
  const cardStyles = [
    styles.card,
    style,
    marginBottom && { marginBottom: theme.sizes.base },
  ];

  return (
    <Block
      flex={flex}
      color={color || theme.colors.white}
      style={cardStyles}
      {...otherProps}
    >
      {children}
    </Block>
  );
};

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base + 4,
  },
});
