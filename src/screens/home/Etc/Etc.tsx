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
          action: () => console.log("pressed"),
        },
        {
          name: "가정통신문",
          action: () => console.log("pressed"),
        },
        {
          name: "행정소식",
          action: () => console.log("pressed"),
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
    <Container title="기타" scroll padding rightItem={<RightItem />}>
      {etcList.map((data, index) => (
        <RenderCategory key={index} data={data} />
      ))}
    </Container>
  );
};
