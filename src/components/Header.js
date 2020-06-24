import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default ({ text }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{text}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 38,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
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
})