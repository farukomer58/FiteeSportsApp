import React, { useState, useEffect } from 'react';
import { Constants } from 'expo'
import {
    Item as FormItem,
    Heading,
    HStack,
    Box,
    Flex,
    Text,
    Spacer
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, ScrollView, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions'
import * as bookingActions from '../../../store/actions/bookingActions'

import moment from "moment"

import Header from '../../../components/Header';

import PressableCard from '../../../components/PressableCard';
import DatesCard from '../../../components/DatesCard';
import Card from '../../../components/Card';
import Values from '../../../constants/Values';
import CustomText from '../../../components/native/CustomText';

import Styles from '../../../constants/Styles';
import LinkText from '../../../components/native/LinkText';
export default function ActivityDetailScreen(props) {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); // Get User Activities of redux 

    const [activityId, setActivityId] = useState(props.route.params.activityId)
    const [activityDetail, setActivityDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // activityId
    const fetchActivityById = async () => {
        const result = await dispatch(activityActions.fetchActivityById(activityId))
        setActivityDetail(result.data.content[0])
        setIsLoading(false)
    }


    const makeBooking = (numberOfLessons) => {
        const body = {
            numberOfLessons: numberOfLessons,
            activityId: activityId,
            userId: auth.userId
        }
        dispatch(bookingActions.makeBooking(body))
        // TODO: Put in State and dont require to fetch from api when still on this screen
    }


    useEffect(() => {
        fetchActivityById()
    }, [])


    if (isLoading) {
        return <View style={styles.backgroundActivity}>
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        </View>
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>

                <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" }} />

                <View style={{ ...Styles.flexDirectionRowSpace, marginTop: 10 }}>
                    <CustomText title style={{ marginHorizontal: 30 }}>{activityDetail.title}</CustomText>
                    <LinkText style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.navigate('Activities') }}>1000 reviews</LinkText>
                    {/* <Text mt="1" style={{ marginHorizontal: 30 }} fontSize={12} fontWeight="medium" color="yellow.600">1000 Reviews</Text> */}
                </View>

                <CustomText style={styles.details}>
                    {activityDetail.activityAddress}, {activityDetail.city} - By  {activityDetail.ownerName}
                </CustomText>

                <CustomText style={styles.description}>
                    {activityDetail.description} 
                </CustomText>
                {/* <CustomText style={styles.description}>
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </CustomText> */}
                {/* Location  */}
                {/* Review  */}
                {/* Save as Favorite Button or maybe in header instead of the bell icon */}


                {/* Show all Available Dates */}
                <Heading size="md" ml="-1" color="white" p={2}> Planned Activities </Heading>
                <ScrollView horizontal={true} height={150}>
                    {activityDetail.activityDates && activityDetail.activityDates.map(val => (
                        <DatesCard key={val.date} navigation={props.navigation} date={val} activityId={activityDetail.id}/>
                    )
                    )}
                </ScrollView>

                {/* Booking Options / Show All Prices, and give the User option to purchase Lessons */}
                <Heading size="md" ml="-1" color="white" p={2}> Price </Heading>
                {activityDetail.activityPrices.map(activity =>
                    <Box key={activity.id} alignItems="center" style={{ margin: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { makeBooking(activity.lessons) }}>
                            <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                                <HStack alignItems="center">
                                    <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                                        {activity.lessons} Lesson Tickets
                                    </Text>
                                    <Spacer />
                                    <Text mt="2" fontsize="xl" color="red.500">
                                        €{activity.price.toFixed(2)}
                                    </Text>

                                </HStack>
                                {activity.discount > 0 && <Text mt="2" fontsize="xl" color="red.500">
                                    -%{activity.discount.toFixed(2)}
                                </Text>}

                                <Flex>
                                    <HStack alignItems="center">

                                        <Spacer />
                                        <Text mt="2" fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                            Book Now
                                        </Text>
                                    </HStack>
                                </Flex>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                )}

                {/* When clicked on reviews redirected to here, Bottom reviews */}
                {/* TODO: Build Reviews here  */}

            </View>
        </ScrollView>
    )
}

export const screenOptions = navData => {
    console.log(navData)
    return {
        headerTitle: "Activity Title",
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        backgroundColor: "#313131"
    },
    backgroundActivity: {
        flex: 1,
        width: "100%",
        backgroundColor: "#313131",
    },
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },

    details: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },


});