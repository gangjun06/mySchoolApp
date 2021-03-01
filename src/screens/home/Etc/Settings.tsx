import React, { useContext, useState } from "react";
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
import { openWeb } from "../../../utils/web";

export const SettingScreen: React.FC = () => {
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState<User>({
    name: "",
    nickname: "",
    role: UserRole.student,
    status: UserStatus.normal,
  });

  const [a, setA] = useState<boolean>(true);

  const renderNameEdit = () => {
    if (editing === "name") {
      return (
        <Input
          defaultValue={user?.name}
          onChangeText={(name: string) => setUser({ ...user, name })}
        />
      );
    }
    return <Text bold>{user.name}</Text>;
  };

  return (
    <Container scroll>
      <Block row space="between" margin={[10, 0]}>
        <Block>
          <Text gray2 style={{ marginBottom: 10 }}>
            이름
          </Text>
          <Text bold>이강준</Text>
        </Block>
      </Block>
      <Block row space="between" margin={[10, 0]}>
        <Block>
          <Text gray2 style={{ marginBottom: 10 }}>
            사용자 정보
          </Text>
          <Text bold>1학년 1반 1번</Text>
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
        <Switch value={a} onValueChange={(value: boolean) => setA(value)} />
      </Block>
      <Block row center space="between">
        <Text gray2>기타 알림</Text>
        <Switch value={a} onValueChange={(value: boolean) => setA(value)} />
      </Block>

      <Divider margin={[theme.sizes.base, 0]} />
      <Button shadow onPress={() => openWeb("https://info.osang.xyz/privacy")}>
        <Text center semibold>
          개인정보처리방침
        </Text>
      </Button>
      <Button
        shadow
        onPress={() => openWeb("https://info.osang.xyz/license/app")}
      >
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
