import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { Block, Button, Switch, Text } from "../../../components/basic";
import { theme } from "../../../constants";
import { SignUpContext } from "./Context";
import Img from "../../../../assets/images/welcome/2.svg";
import { WebView } from "react-native-webview";
import { TouchableOpacity } from "react-native-gesture-handler";
import { openWeb } from "../../../utils/web";

const { width, height } = Dimensions.get("window");

export const PrivacySection = () => {
  const { setPage } = useContext(SignUpContext);
  const [ok, setOk] = useState<boolean>(false);
  const handleSubmit = () => {
    if (!ok) alert("개인정보 처리방침을 동의해 주세요");
    else setPage("role");
  };

  return (
    <>
      <Block center middle flex margin={[0, 0, 0, 0]}>
        <Img width={width - 40} height={height / 3} />
      </Block>

      <Block row center space="between" margin={[theme.sizes.base, 0]}>
        <Block row>
          <TouchableOpacity
            onPress={() => openWeb("https://info.osang.xyz/privacy")}
          >
            <Text gray underline bold>
              개인정보 처리방침
            </Text>
          </TouchableOpacity>
          <Text gray> 동의</Text>
        </Block>
        <Switch value={ok} onValueChange={(value: boolean) => setOk(value)} />
      </Block>
      <Button gradient onPress={handleSubmit}>
        <Text bold center white>
          다음단계
        </Text>
      </Button>
    </>
  );
};
