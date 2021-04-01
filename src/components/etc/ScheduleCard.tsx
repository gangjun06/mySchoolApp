import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../constants";
import { Schedule, SchoolMeal, SchoolMealType } from "../../models";
import { Block, Card, Text } from "../basic";

export const ScheduleCard = ({ data, mt }: { data: Schedule; mt: boolean }) => (
  <Card shadow row margin={[mt ? theme.sizes.base * 1.5 : 0, 0, 0, 0]}>
    <Block
      style={{
        borderRadius: 30 / 2,
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
      }}
      color={"primary"}
      padding={8}
    >
      <Text color="white" bold>
        {data.period.toString()}
      </Text>
    </Block>
    <Block margin={[0, 0, 0, 8]} column flex>
      <Block row space="between" margin={[0, 0, 3, 0]}>
        <Text h3 bold>
          {data.subject}
        </Text>
        <Text>{`${data.grade}학년 ${data.class}반`}</Text>
      </Block>
      <Text>{`${data.teacher} - ${data.classRoom}`}</Text>
    </Block>
  </Card>
);
