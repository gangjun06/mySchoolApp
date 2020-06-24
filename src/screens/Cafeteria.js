import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import School from 'school-kr';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Header from '../components/Header'

export default class HomeScreen extends React.Component {

    state = {
        meal: {},
        focus: ''
    }

    dayOfWeakList = ['일', '월', '화', '수', '목', '금', '토']

    async componentDidMount() {
        this.setState({ focus: moment.now() })
        const school = new School()
        school.init(School.Type.HIGH, School.Region.GYEONGBUK, "R100000931")
        const meal = await school.getMeal({ default: '급식이 없습니다' })
        this.setState({ meal })
    }

    SubDay = () => {
        const focus = this.state.focus
        const result = moment(focus).subtract(1, 'days')
        this.setState({ focus: result })
    }
    AddDay = () => {
        const focus = this.state.focus
        const result = moment(focus).add(1, 'days')
        this.setState({ focus: result })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text="Cafeteria" />
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={this.SubDay} style={{ paddingHorizontal: 10, paddingBottom: 5 }}><Ionicons name="ios-arrow-back" size={24} /></TouchableOpacity>
                    <Text style={styles.cardTitle}>{moment().toObject().months + 1}월 {moment(this.state.focus).toObject().date}일의 급식</Text>
                    <TouchableOpacity onPress={this.AddDay} style={{ paddingHorizontal: 10, paddingBottom: 5 }}><Ionicons name="ios-arrow-forward" size={24} /></TouchableOpacity>
                </View>
                <View style={[styles.card, { marginTop: 16 }]}>
                    <Text>{this.state.meal[moment(this.state.focus).toObject().date]}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },
    cardHeader: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    cardTitle: {
        fontSize: 20
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
    },
});
