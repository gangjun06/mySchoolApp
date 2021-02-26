import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Block, Card, Text } from "../../components/basic";
import { Container } from "../../components/containers";
import { AuthContext } from "../../components/providers/AuthProvider";
import { theme } from "../../constants";

export const HomeScreen: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navPage = (pageName: string) => {};
  return (
    <Container title="홈" scroll padding>
      <Block margin={[theme.sizes.base / 2, 0, 0, 0]}>
        <HomeBlock
          title="오늘의 급식"
          onPress={() => navPage("meal")}
          marginBottom
        ></HomeBlock>
        <HomeBlock
          title="오늘의 시간표"
          onPress={() => navPage("meal")}
          marginBottom
        ></HomeBlock>
        <HomeBlock title="학사일정" onPress={() => navPage("meal")}></HomeBlock>
      </Block>
    </Container>
  );
};

type HomeBlockProp = {
  title: string;
  marginBottom?: boolean;
  onPress: () => void;
};
const HomeBlock: React.FC<HomeBlockProp> = ({
  title,
  onPress,
  marginBottom = false,
  children,
}) => {
  return (
    <Block flex={false} margin={[0, 0, marginBottom ? theme.sizes.base : 0, 0]}>
      <Block
        flex={false}
        row
        space="between"
        center
        margin={[0, 0, theme.sizes.base, 0]}
      >
        <Text h2 bold>
          {title}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Block row flex={false} center>
            <Text secondary>자세히 보기</Text>
            <Feather
              name="chevron-right"
              size={theme.sizes.body}
              color={theme.colors.gray2}
            />
          </Block>
        </TouchableOpacity>
      </Block>
      <Card shadow>{children}</Card>
    </Block>
  );
};
