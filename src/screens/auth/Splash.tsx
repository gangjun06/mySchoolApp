import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  Platform,
} from "react-native";
import { Block, Text, Button } from "../../components/basic";
import { theme } from "../../constants";
import { AuthNavProps } from "../../navigation/ParamList";
import Img1 from "../../../assets/images/welcome/1.svg";
import { Container } from "../../components/containers";

const { width, height } = Dimensions.get("window");

export const SplashScreen: React.FC<AuthNavProps<"Splash">> = ({
  navigation,
}) => {
  return (
    <Container>
      <Block center bottom margin={[theme.sizes.base, 0, 0, 0]}>
        <Text h2 center bold>
          <Text h1 primary>
            오상중학교
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          학교 소식을 누구보다 빠르게 받아보세요
        </Text>
      </Block>
      <Block center middle flex>
        <Img1 width={width} height={height / 3} />
      </Block>
      <Block middle margin={[0, theme.sizes.base]}>
        <Button gradient onPress={() => navigation.navigate("Login")}>
          <Text center semibold white>
            로그인
          </Text>
        </Button>
        <Button
          shadow
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text center semibold>
            회원가입
          </Text>
        </Button>
      </Block>
    </Container>
  );
};
