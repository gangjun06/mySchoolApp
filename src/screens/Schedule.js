import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Axios from "axios";
import Header from '../components/Header'

export default class ScheduleScreen extends React.Component {
  state = {
    scheduleList: []
  };

  async componentDidMount() {
    const scheduleList = await Axios.get("https://osangapi.gangjun.dev/schedule")
    this.setState({ scheduleList: scheduleList.data.list })
  }

  renderSchedule = (schedule) => {
    return (
      <View style={styles.scheduleItem}>
        <TouchableOpacity style={styles.index} onPress={() => this.props.navigation.push('scheduleDetail', schedule.id)}>
          <Text>{schedule.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text="Schedule" />
        <FlatList
          style={styles.schedule}
          data={this.state.scheduleList}
          renderItem={({ item }) => this.renderSchedule(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
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
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
    marginHorizontal: 48,
  },
  menuText: {
    fontSize: 18,
    justifyContent: "center",
    marginTop: 10,
  },
  schedule: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  scheduleItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 13,
    marginVertical: 8,
  },
  index: {
    fontSize: 18,
  },
  maintext: {},
});
