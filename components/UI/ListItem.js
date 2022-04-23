import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
} from 'native-base';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Values from '../../constants/Values';
import CustomText from '../native/CustomText';

export default function ListItem(props) {

    return (
        <TouchableOpacity activeOpacity={0.3} onPress={props.onPress} style={styles.listItem}>
            <View >
                <View style={styles.rowView}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {/* Icon */}
                        {/* <MaterialIcons name="account-circle" size={50} color="white" style={styles.inputIcon} /> */}
                        {props.listItemIcon && props.listItemIcon}
                        <CustomText style={{ margin: 10, fontSize: 16 }}>{props.listItem}</CustomText>
                    </View>
                    <MaterialIcons name="arrow-right" size={50} color="white" style={styles.inputIcon} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    rowView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    listItem: {
        // backgroundColor: "white",
        margin:10,
        color: "black"
    },
})