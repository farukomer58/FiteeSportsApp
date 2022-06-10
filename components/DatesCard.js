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
    IconButton,
    Icon
} from 'native-base';

import moment from "moment"
import Card from './UI/Card';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import CustomText from './native/CustomText';

import Values from '../constants/Values';

export default function DatesCard(props) {

    const momentDate=moment(props.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    console.log(momentDate)

    const reservePlaceAndUseTicket = () => {

        // Check if user has a ticket for the activity

        // Reserve location for the user on selected date if maxParticipant is not reached yet
        // If max participant reached show error message with, this date is full

        // Increment participants
        // Decrement amount of tickets for the activity for the User
        console.log("reserve place for given dateL:L: ")

        // Show user success and refresh page

    }

    return (
        <>
            <Card style={{ margin: 20, width: 250, height:300,  }}>
                <TouchableOpacity activeOpacity={0.8} style={{ width: "100%", height:"100%" }} onPress={() => { reservePlaceAndUseTicket(props.date) }}>
                        <CustomText style={{color:"black"}} fontSize={22}>
                            {momentDate}
                        </CustomText>
                        <CustomText style={{color:"black"}}  mt="2" fontSize={10} color="coolGray.800">
                            1 hour regular session
                        </CustomText>
                            <CustomText style={{color:"black"}}  >
                                Reserve place on this date
                            </CustomText>
                </TouchableOpacity>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({


    image: {
        width: "100%",
        height: 125,
    },
})