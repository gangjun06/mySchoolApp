import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, TouchableOpacityBase } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
    user: { name: "" }
  };

  get user() {
    return {
      _id: Fire.shared.uid,
      name: this.state.user.name,
      avatar: this.state.user.avatar
    };
  }

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() })
      });
    Fire.shared.getMsg(message =>
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message)
      }))
    );

  }

  componentWillUnmount() {
    Fire.shared.offMsg();
  }

  render() {
    const chat = <GiftedChat messages={this.state.messages} onSend={Fire.shared.sendMsg} user={this.user} />;

    if (Platform.OS === "android") {
      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
          {chat}
        </KeyboardAvoidingView>
      );
    }

    return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
  }
}
