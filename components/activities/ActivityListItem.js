import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
} from 'native-base';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Values from '../../constants/Values';
import LinkText from '../native/LinkText';
import CustomText from '../native/CustomText';

export default function ActivityListItem(props) {

    return (
        <TouchableOpacity activeOpacity={0.3} onPress={props.onPress} style={styles.listItem}>
            <View >
                <View style={styles.rowView}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Image source={{ uri: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }} style={styles.image} />
                        {/* Icon */}
                        {/* <MaterialIcons name="account-circle" size={50} color="white" style={styles.inputIcon} /> */}
                        {/* {props.listItemIcon && props.listItemIcon} */}
                        <View style={{ justifyContent: "space-between" }}>
                            <CustomText style={{ marginLeft: 10, fontSize: 16 }}>{props.title}</CustomText>
                            <View>

                                <CustomText style={{ marginLeft: 10, marginTop: 10, fontSize: 12 }}>By {props.author}</CustomText>
                                <CustomText style={{ marginLeft: 10, fontSize: 12 }}>{props.location}</CustomText>
                                <CustomText style={{ marginLeft: 10, fontSize: 12 }}>{props.tags}</CustomText>
                            </View>

                        </View>
                    </View>
                    <View style={{ justifyContent: "space-between", alignItems:"flex-end" }}>
                        <CustomText>Price?</CustomText>
                        <LinkText onPress={() => { props.navigation.navigate('Activities') }}>Read More</LinkText>
                    </View>
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
        margin: 10,
    },

    image: {
        width: 150,
        height: 100,
    },

    rightItem: {
        alignSelf: "flex-end",
    },
})