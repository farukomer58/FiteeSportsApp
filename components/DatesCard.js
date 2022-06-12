import React, { useState, useEffect } from 'react';

import moment from "moment"
import Card from './UI/Card';

import LinkText from './native/LinkText';

import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import * as bookingActions from '../store/actions/bookingActions'


import CustomText from './native/CustomText';
import Values from '../constants/Values';

export default function DatesCard(props) {
    const dispatch = useDispatch();
    const [bookingDetail, setBookingDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const momentDate = moment(props.date).format("dddd, MMMM Do YYYY, h:mm:ss a")

    // Make request to see if user has Booking or Not
    const fetchBookingDetail = async () => {
        const result = await dispatch(bookingActions.fetchBookingDetail(props.activityId))
        setBookingDetail(result.data)
        setIsLoading(false)
    }


    useEffect(()=>{
        fetchBookingDetail()
    },[])

    const reservePlaceAndUseTicket = () => {

        // Check if user has a ticket for the activity
        if(!bookingDetail) {Alert.alert("Please Make A booking before selecting a Date")}
        // if(bookingDetail.remainingAmount <=0 ) {Alert.alert("Please Make A booking before selecting a Date")}
        if(props.currentParticipants >= props.maxParticipants ) {Alert.alert("The Max Participants for this date is reached, please select another date")}

        // Reserve location for the user on selected date if maxParticipant is not reached yet
        // If max participant reached show error message with, this date is full

        // add one to participant, activityDate
        props.date.currentParticipants = props.date.currentParticipants + 1
        // substract one ticket from booking
        setBookingDetail({...bookingDetail, remainingAmount: bookingDetail.remainingAmount-1}) 


        // Increment participants
        // Decrement amount of tickets for the activity for the User
        console.log(props.date)
        console.log(bookingDetail)
        console.log("reserve place for given dateL:L: ")
        console.log(momentDate)

        // send reqwuest with both activityDate and Booking to update them in one request


        // Show user success and refresh page

    }

    return (
        <>
            <Card style={{ margin: 20, width: 250, height: "100%", }}>
                <TouchableOpacity activeOpacity={0.8} style={{ width: "100%", height: "100%" }} onPress={() => { reservePlaceAndUseTicket(props.date) }}>

                    <View style={{ justifyContent: "space-between", height: "80%" }}>
                        <View>
                            <CustomText style={{ color: "black", fontSize: 16, textAlign: "center" }}> {momentDate}</CustomText>
                            <CustomText style={{ color: "black", fontSize: 13, textAlign: "center" }}> 1 hour regular session </CustomText>
                        </View>

                        <LinkText onPress={() => { reservePlaceAndUseTicket() }} pressedColor="#f34" releaseColor="black" disabled={bookingDetail.remainingAmount<=0} style={{ fontSize: 16, textAlign: "center" }}>
                            Reserve place on this date
                        </LinkText>
                    </View>


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