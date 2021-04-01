import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../constants";
import { Calendar, SchoolMeal, SchoolMealType } from "../../models";
import { Block, Card, Text } from "../basic";

export const CalendarCard = ({ data, mt }: { data: Calendar; mt: boolean }) => (
  <Card shadow row margin={[mt ? 0 : theme.sizes.base * 1.5, 0, 0, 0]} center>
    <Block
      style={{ borderRadius: 100, alignSelf: "baseline" }}
      color={"primary"}
      center
      padding={8}
    >
      <Ionicons
        //@ts-ignore
        name={data.icon}
        size={24}
        color={theme.colors.white}
      />
    </Block>
    <Block margin={[0, 0, 0, 8]} column flex>
      <Block row space="between" margin={[0, 0, 3, 0]}>
        <Text h3 bold>
          {data.title}
        </Text>
        <Text>{data.day}일</Text>
      </Block>
      <Text>{data.description ? data.description : data.title}</Text>
    </Block>
  </Card>
);
