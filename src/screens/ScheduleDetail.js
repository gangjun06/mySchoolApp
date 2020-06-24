import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Axios from "axios";

export default class ScheduleDetailScreen extends React.Component {
    state = {
        curDay: "",
        scheduleList: [],
        scheduleID: null
    };
    dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    curDate = moment();

    componentDidMount() {
        this.getSchedule()
    }

    async getSchedule() {
        const date = this.curDate.format("E");
        const res = await Axios.get(`https://osangapi.gangjun.dev/schedule/detail?id=${this.props.navigation.state.params}&day=${date}`)
        const dateString = this.dayList[parseInt(date) - 1];
        this.setState({
            formatedDate: dateString,
            scheduleList: res.data.list,
        });
    }

    handleBackButton = () => {
        this.curDate.subtract(1, "days");
        this.getSchedule();
    };

    handleForwardButton = () => {
        this.curDate.add(1, "days");
        this.getSchedule();
    };

    renderSchedule = (schedule) => {
        return (
            <View style={styles.scheduleItem}>
                <Text style={styles.index}>
                    {(parseInt(schedule.order)).toString()}교시: {schedule.subject} (
                    {schedule.teacher} 선생님)
                </Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>시간표</Text>
                </View>
                <View style={styles.menu}>
                    <TouchableOpacity
                        onPress={this.handleBackButton}
                        style={{ padding: 10 }}
                    >
                        <Ionicons name="ios-arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.menuText}>{this.state.formatedDate}</Text>
                    <TouchableOpacity
                        onPress={this.handleForwardButton}
                        style={{ padding: 10 }}
                    >
                        <Ionicons name="ios-arrow-forward" size={24} />
                    </TouchableOpacity>
                </View>
                {this.state.scheduleList[0] === undefined ? (
                    <Text style={{ textAlign: "center" }}>
                        시간표가 존재하지 않습니다
                    </Text>
                ) : (
                        <View></View>
                    )}
                <FlatList
                    style={styles.schedule}
                    data={this.state.scheduleList}
                    renderItem={({ item }) => this.renderSchedule(item)}
                    keyExtractor={(item) => item.order}
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
    header: {
        justifyContent: "center",
        paddingTop: 54,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
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
