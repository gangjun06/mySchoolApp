import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions/";

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.setup();
  }

  async setup() {
    await this.props.checkAuth();
    if (this.props.isAuth) {
      switch (this.props.status) {
        case 0:
          this.props.navigation.navigate("wait", {
            title: "승인대기",
            text:
              "계정정보를 확인하기위하여 승인을 기다리고 있습니다. 24시간안에 처리하려 노력하고있으니 조금만 기다려주시면 감사하겠습니다.",
          });
          break;
        case 2:
          this.props.navigation.navigate("wait", {
            title: "승인거절",
            text:
              "승인이 거절되었습니다. 입력한 정보들이 정확한지 확인하여주세요.",
          });
          break;
        case 4:
          this.props.navigation.navigate("wait", {
            title: "계정정지",
            text:
              "계정이 일시정지 되었습니다. 궁금한 사항은 me@gangjun.dev로 문의하여 주세요.",
          });
          break;
        default:
          this.props.navigation.navigate(this.props.isAuth ? "Home" : "Auth");
      }
    }
    if (this.props.status == 0) {
      this.props.navigation.navigate("wait", "계정이 승인대기중입니다");
      return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
    status: state.auth.status,
  };
};

export default compose(connect(mapStateToProps, actions))(LoadingScreen);
