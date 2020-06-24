import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/";
import Axios from "axios";
import Header from "../components/Header";

class HomeScreen extends React.Component {
  state = {
    postList: [],
    isFetching: false,
  };

  componentDidMount() {
    console.warn("token HomeScreen: " + this.props.token);
    this.getList();
  }

  async getList() {
    const res = await Axios.get("https://osangapi.gangjun.dev/posts?start=0");
    let list = res.data.list.map((item) =>
      item.deleted
        ? {}
        : {
            id: item.id,
            name: item.anon ? "익명" : item.name,
            title: item.title,
            maintext: item.maintext,
            text: item.text,
            timestamp: item.timestamp,
          }
    );
    this.setState({ postList: list, isFetching: false });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () {
      this.getList();
    });
  }

  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <TouchableOpacity
          onPress={() => this.props.navigation.push("postDetail", { post })}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{}}>
                <View>
                  <Text style={styles.name}>
                    [{post.text}] {post.title} - {post.name}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.timestamp}>
              {moment(post.timestamp).fromNow()}
            </Text>
            <Text style={{ marginTop: 7 }}>
              {post.maintext.length > 70
                ? post.maintext.substring(0, 70) + "..."
                : post.maintext}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Ionicons
                name="ios-heart-empty"
                size={24}
                color="#73788B"
                style={{ marginRight: 16 }}
              />
              <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header text="Feed" />
        <FlatList
          style={[styles.feed, { marginTop: 24 }]}
          data={this.state.postList}
          renderItem={({ item }) => this.renderPost(item)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default compose(connect(mapStateToProps, actions))(HomeScreen);
