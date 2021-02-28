import React from "react";
import { Switch as ReactSwitch, Platform } from "react-native";

import { theme } from "../../constants";

const GRAY_COLOR = "rgba(168, 182, 200, 0.30)";

export const Switch = (props: any) => {
  const { value, ...otherProps } = props;
  let thumbColor = null;

  if (Platform.OS === "android") {
    thumbColor = GRAY_COLOR;
    if (props.value) thumbColor = theme.colors.secondary;
  }

  return (
    <ReactSwitch
      thumbColor={thumbColor}
      ios_backgroundColor={GRAY_COLOR}
      trackColor={{
        // false: GRAY_COLOR,
        true: theme.colors.secondary,
      }}
      value={value}
      {...otherProps}
    />
  );
};
