import React from "react";
import { View, Text, Button } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/";

class WaitScreen extends React.Component {
  componentDidMount() {
    console.warn(this.props.navigation.state.params);
  }

  async signOut() {
    await this.props.signOut();
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            color: "#000000",
            marginHorizontal: 24,
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "700" }}>
            {this.props.navigation.state.params.title}
          </Text>
          <Text style={{ marginTop: 24 }}>
            {this.props.navigation.state.params.text}
          </Text>
          <Button
            onPress={() => {
              this.signOut();
            }}
            title="로그아웃"
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default compose(connect(mapStateToProps, actions))(WaitScreen);
