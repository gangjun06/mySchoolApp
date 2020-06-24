import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/";

class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    name: "",
    grade: "",
    studentclass: "",
    password: "",
    passwordConfirm: "",
    number: "",
    teacher: false,
    numberList: [],
    errorMessage: null,
  };

  componentDidMount() {
    for (let i = 0; i < 35; i++) {
      this.state.numberList.push({
        label: i.toString() + "번",
        value: i.toString(),
      });
    }
  }

  handleSignUp = async () => {
    const {
      name,
      password,
      passwordConfirm,
      teacher,
      grade,
      studentclass,
      number,
    } = this.state;
    const trimName = name.trim();

    if (trimName.length < 2 || trimName.length > 7) {
      return this.setState({ errorMessage: "제대로된 이름을 적어주세요" });
    }
    if (!teacher && (grade === "" || studentclass === "" || number === "")) {
      return this.setState({ errorMessage: "칸을 전부 체워주세요" });
    }
    if (password.length < 5 || password.length > 20) {
      return this.setState({
        errorMessage: "비밀번호는 6자 이상, 20자 이하로 적어주세요",
      });
    }
    if (password !== passwordConfirm) {
      return this.setState({
        errorMessage: "비밀번호와 비밀번호확인이 일치하지 않습니다",
      });
    }
    await this.props.signUp({
      name: trimName,
      password,
      teacher,
      grade,
      studentclass,
      number,
    });

    if (this.props.errorMessage) {
      return this.setState({ errorMessage: this.props.errorMessage });
    }
    this.props.navigation.navigate("Loading");
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <Image
            source={require("../assets/authHeader.png")}
            style={{ marginTop: -176, marginLeft: -50 }}
          />
          <Image
            source={require("../assets/authFooter.png")}
            style={{ position: "absolute", bottom: -325, right: -225 }}
          />
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-arrow-round-back"
              size={32}
              color="#FFF"
            ></Ionicons>
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              top: 22,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={styles.greeting}>
              {`안녕하세요.\n회원가입하여 서비스를 이용하세요`}
            </Text>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>이름</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="실명을 적어주세요"
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
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>비밀번호 확인</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(passwordConfirm) =>
                  this.setState({ passwordConfirm })
                }
                value={this.state.passwordConfirm}
              ></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>선생님인가요?</Text>
              <Switch
                style={{ marginTop: 12 }}
                humbColor={this.state.teacher ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={(teacher) => this.setState({ teacher })}
                value={this.state.teacher}
              />
            </View>
            {!this.state.teacher ? (
              <View
                style={{
                  marginTop: 32,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View>
                  <Text style={styles.inputTitle}>학년</Text>
                  <RNPickerSelect
                    onValueChange={(value) => this.setState({ grade: value })}
                    items={[
                      { label: "1학년", value: "1" },
                      { label: "2학년", value: "2" },
                      { label: "3학년", value: "3" },
                    ]}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.inputTitle}>반</Text>
                  <RNPickerSelect
                    onValueChange={(value) =>
                      this.setState({ studentclass: value })
                    }
                    items={[
                      { label: "인반", value: "1" },
                      { label: "의반", value: "2" },
                      { label: "예반", value: "3" },
                    ]}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.inputTitle}>번호</Text>
                  <RNPickerSelect
                    onValueChange={(value) => this.setState({ number: value })}
                    items={this.state.numberList}
                  />
                </View>
              </View>
            ) : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              이미 계정을 가지고 계신가요?{" "}
              <Text style={{ fontWeight: "500", color: "#E9446A" }}>
                로그인
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    color: "#FFF",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 24,
    height: 30,
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
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default compose(connect(mapStateToProps, actions))(RegisterScreen);
