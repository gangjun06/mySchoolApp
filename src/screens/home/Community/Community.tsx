import React, { useContext } from "react";
import { View, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { AuthContext } from "../../../components/providers/AuthProvider";

import { Block, Card, Text } from "../../../components/basic";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../../constants";

export const CommunityScreen: React.FC = () => {
  const onPress = (category: string) => {};

  const BuildCard = ({ title, caption, id, ...otherProps }: any) => (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Card shadow {...otherProps} row space="between" center>
        <Block>
          <Text title>{title}</Text>
          <Text caption color="gray">
            {caption}
          </Text>
        </Block>
        <Feather name="chevron-right" size={theme.sizes.base * 1.5} />
      </Card>
    </TouchableOpacity>
  );

  const BuildDivLine = () => (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray2,
        marginBottom: theme.sizes.base,
      }}
    />
  );

  return (
    <Container title="커뮤니티" scroll padding>
      <BuildCard
        id="1"
        title={"학생 청원게시판"}
        caption={"학교와 관련한 불편한 사항들을 제보하세요"}
        marginBottom
      />
      <BuildDivLine />
      <BuildCard
        id="1000"
        title={"테스트 게시판 1"}
        caption={"테스트 게시판 1"}
        marginBottom
      />
      <BuildCard
        id="2000"
        title={"테스트 게시판 2"}
        caption={"테스트 게시판 2"}
        marginBottom
      />
    </Container>
  );
};
