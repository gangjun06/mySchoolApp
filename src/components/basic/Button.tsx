import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../constants";

import { TouchableOpacity } from "react-native-gesture-handler";

export const Button = (props: any & TouchableOpacity["props"]) => {
  const {
    style,
    opacity,
    gradient,
    color,
    startColor,
    loading = false,
    absolute,
    endColor,
    end,
    start,
    locations,
    shadow,
    children,
    ...otherProps
  } = props;
  const buttonStyles = [
    styles.button,
    absolute && styles.absolute,
    shadow && styles.shadow,
    //@ts-ignore
    color && styles[color], // predefined styles colors for backgroundColor
    //@ts-ignore
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity}
        {...otherProps}
      >
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            children
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...otherProps}
    >
      {loading ? <ActivityIndicator size="small" color="white" /> : children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  absolute: {
    position: "absolute",
    zIndex: -1,
    bottom: -30,
    left: 0,
    right: 0,
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
});
