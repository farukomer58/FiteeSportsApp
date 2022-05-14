import React, { Component } from 'react';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function HorizontalLine(props) {

    return (
        <View style={styles.line}>
        </View>
    )
}

const styles = StyleSheet.create({
    line:{
        height:1,
        // width:"100%",
        backgroundColor:"#6b6b6b",
        marginHorizontal:5,
    },
    rowView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    listItem: {
        // backgroundColor: "white",
        margin: 10,
    },
})