import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class PostDetail extends React.Component {
  state = {
    post: {},
    comment: "",
    commentList: [],
    isFetching: false,
  };

  componentDidMount() {
    this.setState({ post: this.props.navigation.state.params.post }, () => {
      this.getComment();
    });
  }

  handleCommentBtn = async () => {
    const comment = this.state.comment;
    if (!comment) return;
    this.setState({ comment: "" });
    try {
      await Axios.post(
        "https://osangapi.gangjun.dev/posts/comment",
        {
          post_id: this.state.post.id,
          maintext: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        }
      );
      this.onRefresh();
    } catch (e) {
      console.warn(e);
      alert("처리중 에러가 발생하였습니다.");
    }
  };

  getComment = async () => {
    let res;
    try {
      res = await Axios.get(
        `https://osangapi.gangjun.dev/posts/comment?id=${this.state.post.id}`
      );
      this.setState({ commentList: res.data.list, isFetching: false });
    } catch (e) {
      console.warn(e);
      this.setState({ isFetching: false });
      return alert("처리중 에러가 발생하였습니다.");
    }
  };

  onRefresh() {
    this.setState({ isFetching: true }, function () {
      this.getComment();
    });
  }

  renderComment = (comment) => {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor: "#ffffff",
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginVertical: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{}}>{comment.name}</Text>
          <Text style={{}}>{moment(comment.timestamp).fromNow()}</Text>
        </View>
        <Text style={{}}>{comment.maintext}</Text>
      </View>
    );
  };

  render() {
    const post = this.state.post;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
            </TouchableOpacity>
            <View />
          </View>
          <View style={{ marginTop: 32, marginHorizontal: 32 }}>
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
              {moment(post.timestamp).format("Y년 M월 D일 h시 m분")}
            </Text>
            <Text style={{ marginTop: 7 }}>{post.maintext}</Text>

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
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 32,
            }}
          >
            <TextInput
              autoFocus={false}
              numberOfLines={4}
              style={[{ flex: 1 }, styles.commentInput]}
              placeholder="댓글달기.."
              onChangeText={(comment) => this.setState({ comment })}
              value={this.state.comment}
              maxLength={15}
            ></TextInput>
            <TouchableOpacity
              onPress={() => this.handleCommentBtn()}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                name="ios-send"
                size={24}
                color={this.state.comment ? "#232323" : "#D8D9DB"}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ marginTop: 24, marginHorizontal: 32 }}
            data={this.state.commentList}
            renderItem={({ item }) => this.renderComment(item)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onRefresh={() => this.getComment()}
            refreshing={this.state.isFetching}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  commentInput: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
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
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default compose(connect(mapStateToProps, actions))(PostDetail);
