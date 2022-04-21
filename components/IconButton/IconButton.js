import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
    Text,
    Spacer,
    Item as FormItem,
    Flex,
    Box,
    Badge,
    HStack,
    Icon
} from 'native-base';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function IconButton(props) {

    return (
        <>
            <TouchableOpacity activeOpacity={0.25} onPress={props.onPress} >
                {props.children}
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    iconButton:{
        alignSelf:"flex-start",
        justifyContent:"flex-start",
        backgroundColor:"red"
    },
})