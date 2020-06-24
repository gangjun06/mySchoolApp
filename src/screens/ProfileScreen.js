import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/";
import Axios from "axios";

class ProfileScreen extends React.Component {
  state = {
    user: {},
    info: { post: 0, comment: 0 },
  };

  async componentDidMount() {
    const res = await Axios.get("https://osangapi.gangjun.dev/users/profile", {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    this.setState({ info: { ...res.data } });
  }

  async signOut() {
    await this.props.signOut();
    this.props.navigation.navigate("Auth");
  }

  render() {
    const { info } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <Text style={styles.name}>
            {info.name}
            {info.teacher
              ? null
              : ` ${info.grade}학년 ${info.class}반 ${info.class_number}번`}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{info.post}</Text>
            <Text style={styles.statTitle}>작성한 글</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{info.comment}</Text>
            <Text style={styles.statTitle}>작성한 댓글</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>업데이트예정</Text>
            <Text style={styles.statTitle}>좋아요표시한 글</Text>
          </View>
        </View>
        <Button
          onPress={() => {
            this.signOut();
          }}
          title="로그아웃"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
  };
};

export default compose(connect(mapStateToProps, actions))(ProfileScreen);
