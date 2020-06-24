import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/";

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    name: "",
    password: "",
    errorMessage: null,
  };

  componentDidMount() {
  }

  handleLogin = async () => {
    const { name, password } = this.state;
    const trimName = name.trim()

    this.setState({ errorMessage: '' })
    await this.props.signIn({ name: trimName, password })
    if (this.props.errorMessage) {
      this.setState({ errorMessage: this.props.errorMessage })
    } else {
      this.props.navigation.navigate("Home")
    }

  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../assets/authHeader.png")}
          style={{ marginTop: -176, marginLeft: -50 }}
        ></Image>
        <Image
          source={require("../assets/authFooter.png")}
          style={{ position: "absolute", bottom: -325, right: -225 }}
        ></Image>
        <Image
          source={require("../assets/loginLogo.png")}
          style={{ marginTop: -110, alignSelf: "center" }}
        ></Image>
        <Text style={styles.greeting}>
          {`안녕하세요.\n오상중 앱에 오신것을 환영합니다.`}
        </Text>

        <View>
          <View style={styles.errorMessage}>
            {this.state.errorMessage ? (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            ) : null}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>이름</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              ></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>비밀번호</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>로그인하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              계정이 없으신가요?{" "}
              <Text style={{ fontWeight: "500", color: "#E9446A" }}>
                회원가입
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
    errorMessage: state.auth.errorMessage
  }
}

export default compose(connect(mapStateToProps, actions))(LoginScreen)
