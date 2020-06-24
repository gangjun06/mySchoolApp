import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import Axios from "axios";

class PostScreen extends React.Component {
  state = {
    title: "",
    text: "",
    anon: false,
    category: null,
    categoryList: [],
  };

  async componentDidMount() {
    const res = await Axios.get("https://osangapi.gangjun.dev/posts/category");
    let list = res.data.list;
    list.shift();
    this.setState({
      categoryList: list.map((item) => ({ label: item.text, value: item.id })),
    });
  }

  async postData() {
    const { title, text, category, anon } = this.state;
    if (title.trim() == "") {
      return alert("제목을 넣어주세요");
    }
    if (category == null) {
      return alert("카테고리를 선택해주세요");
    }
    try {
      await Axios.post(
        "https://osangapi.gangjun.dev/posts/",
        {
          title: title.trim(),
          maintext: text.trim(),
          category: category,
          anon: anon ? 1 : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        }
      );
    } catch (e) {
      console.warn(e);
      console.warn(this.props.token);
      alert("처리중 에러가 발생하였습니다");
    }
    this.props.navigation.pop();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.postData();
            }}
          >
            <Text style={{ fontWeight: "500" }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="제목"
            onChangeText={(text) => this.setState({ title: text })}
            value={this.state.title}
            maxLength={15}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 32 }}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="공유할 내용을 적어주세요...&#13;&#10;상대방을 기분나쁘게 하는 글은 경고없이 삭제될 수 있습니다&#13;&#10;익명글도 관리자는 작성자를 확인할 수 있습니다"
            onChangeText={(text) => this.setState({ text })}
            maxLength={1000}
            value={this.state.text}
          ></TextInput>
        </View>
        <View
          style={[styles.inputContainer, { justifyContent: "space-around" }]}
        >
          <View>
            <Text style={styles.inputTitle}>익명으로 작성</Text>
            <Switch
              style={{ marginTop: 12 }}
              humbColor={this.state.anon ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={(anon) => this.setState({ anon })}
              value={this.state.anon}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>카테고리</Text>
            <RNPickerSelect
              onValueChange={(value) => this.setState({ category: value })}
              items={this.state.categoryList}
              itemKey="text"
            />
          </View>
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
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default compose(connect(mapStateToProps, actions))(PostScreen);
