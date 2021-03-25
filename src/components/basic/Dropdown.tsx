import React, { useCallback, useMemo, useRef } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import * as Icon from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { Text } from "./Text";
import { Block } from "./Block";
import { Button } from "./Button";
import { theme } from "../../constants";
import { DarkBgBackDrop } from "../bottomSheet/DarkBg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "./Card";

export type DropdownItem = {
  key: string;
  label: string;
  description?: string;
};

export const Dropdown = (props: {
  label: string;
  error: string;
  items: DropdownItem[];
  value: string;
  description: string;
  onChangeValue: (key: string) => void;
}) => {
  const {
    label = "",
    error = null,
    items,
    value,
    onChangeValue,
    description,
  } = props;

  const ref = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%", "80%"], []);

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
  ];

  const RenderRight = useCallback(() => {
    return (
      <Button style={styles.right} onPress={() => ref.current.present()}>
        <Icon.Feather
          name="chevron-down"
          color={theme.colors.gray}
          size={theme.sizes.font * 1.35}
        />
      </Button>
    );
  }, []);

  const text = useMemo(() => {
    const result = items.find((d) => d.key === value);
    return result ? result.label : "아이템을 찾을 수 없습니다";
  }, [value]);

  const handleClick = useCallback(
    (key: string) => {
      if (key == value) return;
      onChangeValue(key);
      ref.current.dismiss();
    },
    [items, value]
  );

  return (
    <Block flex={false} margin={[theme.sizes.base, 0]}>
      <RenderLabel />
      <Block style={inputStyles}>
        <Text style={[styles.inputText]}>{text}</Text>
      </Block>
      <RenderRight />
      {error != null && (
        <>
          <Block flex={false} margin={[4, 0, 0, 0]}>
            <Text accent>{error}</Text>
          </Block>
        </>
      )}
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={DarkBgBackDrop}
      >
        <Block padding={[0, theme.sizes.padding]}>
          <Text bold h1>
            {label}
          </Text>
          <Text style={{ marginTop: theme.sizes.base / 2 }}>{description}</Text>
        </Block>
        <BottomSheetScrollView>
          {items.map((d, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              style={{
                marginHorizontal: theme.sizes.base,
              }}
              onPress={() => handleClick(d.key)}
            >
              <Card
                style={[styles.card, d.key === value && styles.selected]}
                shadow
                marginTop={true}
              >
                <Text>{d.label}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Block>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 0,
  },
  input: {
    height: theme.sizes.base * 3,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    display: "flex",
    justifyContent: "center",
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputText: {
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
  },
  inputError: {
    borderBottomColor: theme.colors.accent,
  },
  right: {
    position: "absolute",
    alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
  card: {},
  selected: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
});
