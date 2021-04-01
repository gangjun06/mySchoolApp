import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../constants";
import { SchoolMeal, SchoolMealType } from "../../models";
import { Block, Card, Text } from "../basic";

export const MealCard = ({ data, mt }: { data: SchoolMeal; mt: boolean }) => (
  <Card shadow row margin={[mt ? theme.sizes.base * 1.5 : 0, 0, 0, 0]}>
    <Block
      style={{ borderRadius: 100, alignSelf: "baseline" }}
      color={
        data.type === SchoolMealType.BREAKFAST
          ? "primary"
          : data.type === SchoolMealType.LUNCH
          ? "secondary"
          : "tertiary"
      }
      center
      padding={8}
    >
      <Ionicons
        name={
          data.type === SchoolMealType.BREAKFAST
            ? "cafe-outline"
            : data.type === SchoolMealType.LUNCH
            ? "fast-food-outline"
            : "pizza-outline"
        }
        size={24}
        color={theme.colors.white}
      />
    </Block>
    <Block margin={[0, 0, 0, 8]} column flex>
      <Block row space="between" margin={[0, 0, 3, 0]}>
        <Text h3 bold>
          {data.type === SchoolMealType.BREAKFAST
            ? "아침"
            : data.type === SchoolMealType.LUNCH
            ? "점심"
            : "저녁"}
        </Text>
        <Text>{data.calorie}</Text>
      </Block>
      <Text>
        {data.content
          .replace(/<br\/>/gi, ", ")
          .replace(/[\d.]/gi, "")
          .trim()}
      </Text>
    </Block>
  </Card>
);
