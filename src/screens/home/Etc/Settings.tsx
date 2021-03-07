import React, { useContext, useEffect, useState } from "react";
import { View, Touchable, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { AuthContext } from "../../../components/providers/AuthProvider";

import {
  Block,
  Card,
  Divider,
  Text,
  Switch,
  Input,
  Button,
} from "../../../components/basic";
import { Feather, Ionicons } from "@expo/vector-icons";
import { theme } from "../../../constants";
import { User, UserRole, UserStatus } from "../../../models/User";
import { openWeb, URL_LICENSE, URL_PRIVACY } from "../../../utils/web";

export const SettingScreen: React.FC = () => {
  const { logout, user } = useContext(AuthContext);

  const userInfoText = () => {
    switch (user.detail?.__typename) {
      case UserRole.student:
        return `${user.detail.grade}학년 ${user.detail.class}반 ${user.detail.number}번`;
      case UserRole.officals:
        return `${user.detail.role}`;
      case UserRole.teacher:
        return `${user.detail.subject?.join(" ")}`;
    }
  };
  const onChangeNotifiSetting = () => {
    alert("아직 기능구현이 되어있지 않습니다. 설정에서 알림권한을 꺼주세요.");
  };

  return (
    <Container scroll>
      <Block row space="between" margin={[10, 0]}>
        <Block>
          <Text gray2 style={{ marginBottom: 10 }}>
            이름
          </Text>
          <Text bold>{user.name}</Text>
        </Block>
      </Block>
      <Block row space="between" margin={[10, 0]}>
        <Block>
          <Text gray2 style={{ marginBottom: 10 }}>
            사용자 정보
          </Text>
          <Text bold>{userInfoText()}</Text>
        </Block>
      </Block>

      <Divider margin={[theme.sizes.base, 0]} />

      <Block
        row
        center
        space="between"
        style={{ marginBottom: theme.sizes.base * 2 }}
      >
        <Text gray2>댓글 알림</Text>
        <Switch value={true} onValueChange={onChangeNotifiSetting} />
      </Block>
      <Block row center space="between">
        <Text gray2>기타 알림</Text>
        <Switch value={true} onValueChange={onChangeNotifiSetting} />
      </Block>

      <Divider margin={[theme.sizes.base, 0]} />
      <Button shadow onPress={() => openWeb(URL_PRIVACY)}>
        <Text center semibold>
          개인정보처리방침
        </Text>
      </Button>
      <Button shadow onPress={() => openWeb(URL_LICENSE)}>
        <Text center semibold>
          오픈소스 라이선스
        </Text>
      </Button>
      <Button shadow onPress={logout}>
        <Text center semibold>
          로그아웃
        </Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({});
