import React, { useContext } from "react";
import { View, Touchable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { AuthContext } from "../../../components/providers/AuthProvider";

import { Block, Card, Divider, Text } from "../../../components/basic";
import { Feather, Ionicons } from "@expo/vector-icons";
import { theme } from "../../../constants";
import { EtcNavProps } from "../../../navigation/ParamList";
import { openWeb } from "../../../utils/web";
import { HomepageBoardType } from "../../../models";

type etcListType = {
  name: string;
  items: etcListItemType[];
};
type etcListItemType = {
  name: string;
  action: () => void;
};

export const EtcScreen: React.FC<EtcNavProps<"Etc">> = ({ navigation }) => {
  const onPress = (category: string) => {};

  const etcList: etcListType[] = [
    {
      name: "학교 홈페이지",
      items: [
        {
          name: "바로가기",
          action: () => openWeb("http://school.gyo6.net/osangms"),
        },
        {
          name: "공지사항",
          action: () =>
            navigation.navigate("BoardList", {
              boardName: "공지사항",
              board: HomepageBoardType.Notice,
            }),
        },
        {
          name: "가정통신문",
          action: () =>
            navigation.navigate("BoardList", {
              boardName: "가정통신문",
              board: HomepageBoardType.Prints,
            }),
        },
        {
          name: "행정소식",
          action: () =>
            navigation.navigate("BoardList", {
              boardName: "행정소식",
              board: HomepageBoardType.Administration,
            }),
        },
        {
          name: "평가계획",
          action: () =>
            navigation.navigate("BoardList", {
              boardName: "평가계획",
              board: HomepageBoardType.EvaluationPlan,
            }),
        },
        {
          name: "학교규정",
          action: () =>
            navigation.navigate("BoardList", {
              boardName: "학교규정",
              board: HomepageBoardType.Rule,
            }),
        },
      ],
    },
    {
      name: "계산기",
      items: [
        {
          name: "평균 계산기",
          action: () => console.log("pressed"),
        },
      ],
    },
    {
      name: "기타",
      items: [
        {
          name: "서비스 피드백",
          action: () => console.log("pressed"),
        },
      ],
    },
  ];

  const RightItem = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Feather name="settings" size={24} />
    </TouchableOpacity>
  );

  const RenderCategory = ({ data: { name, items } }: { data: etcListType }) => (
    <>
      <Block>
        <Text gray h3>
          {name}
        </Text>
        <Block row wrap margin={[theme.sizes.base / 4, 0, 0, 0]}>
          {items.map((data, index) => (
            <RenderItem key={index} data={data} />
          ))}
        </Block>
      </Block>
      <Divider margin={[theme.sizes.base * 2, 0]} />
    </>
  );
  const RenderItem = ({
    data: { name, action },
  }: {
    data: etcListItemType;
  }) => (
    <Block style={{ flexBasis: "50%", marginTop: theme.sizes.base }}>
      <TouchableOpacity onPress={action}>
        <Text>{name}</Text>
      </TouchableOpacity>
    </Block>
  );

  return (
    <Container title="기타" padding rightItem={<RightItem />}>
      {etcList.map((data, index) => (
        <RenderCategory key={index} data={data} />
      ))}
    </Container>
  );
};
