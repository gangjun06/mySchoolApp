import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { theme } from "../../constants";

export const DarkBgBackDrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  // animated variables
  const animatedOpacity = useMemo(
    () =>
      interpolate(animatedIndex, {
        inputRange: [0, 0.7],
        outputRange: [0, 0.7],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex]
  );

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: theme.colors.black,
        opacity: animatedOpacity,
      },
    ],
    [style, animatedOpacity]
  );

  return <Animated.View style={containerStyle} />;
};
