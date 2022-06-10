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


import Header from '../../../components/Header';

import PressableCard from '../../../components/PressableCard';
import DatesCard from '../../../components/DatesCard';
import Card from '../../../components/Card';
import Values from '../../../constants/Values';
import CustomText from '../../../components/native/CustomText';

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
    }


    useEffect(() => {
        fetchActivityById()
    }, [])


    const renderPriceItem = (item) => {
        return <Box alignItems="center" style={{ margin: 10 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { props.navigation.navigate("ActivityDetail") }}>
                <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                    <HStack alignItems="center">
                        <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                            {item.item.lessons} Lesson Tickets
                        </Text>
                        <Spacer />
                        <Text mt="2" fontsize="xl" color="red.500">
                            €{item.item.price.toFixed(2)}
                            €{item.item.discount.toFixed(2)}
                        </Text>
                    </HStack>


                    <Flex>
                        <HStack alignItems="center">

                            <Spacer />
                            <Text mt="2" fontSize={12} fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                Book Now
                            </Text>
                        </HStack>
                    </Flex>
                </Box>
            </TouchableOpacity>
        </Box>
    }

    if (isLoading) {
        return <View style={styles.backgroundActivity}>
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        </View>
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>

                <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" }} />

                <CustomText fontSize="xl">{activityDetail.title}</CustomText>
                {/* <View style={styles.actions}>
                <Button color={Values.primaryColor} title="Add to Cart" onPress={() => { }} />
            </View> */}
                {/* <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text> */}
                <CustomText style={styles.description}>
                    Lorem Ipsum is simply dummy text of the printing t everpopularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                </CustomText>
                <CustomText style={styles.description}>
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </CustomText>
                {/* Location  */}
                {/* Review  */}
                {/* Save as Favorite Button or maybe in header instead of the bell icon */}


                <Heading size="md" ml="-1" color="white" p={2}>
                    Planned Activities
                </Heading>
                <ScrollView horizontal={true} height={150}>
                    {/* style={{ backgroundColor: 'blue' }} */}
                    <HStack>
                        {["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"].map(val => (
                            <DatesCard key={val} navigation={props.navigation} />
                        )
                        )}
                    </HStack>
                </ScrollView>

                {/* Booking Options  */}
                <Heading size="md" ml="-1" color="white" p={2}>
                    Price
                </Heading>

                {/* <FlatList
                    data={activityDetail}
                    renderItem={renderPriceItem}
                    keyExtractor={item => item.id}
                /> */}

                {activityDetail.activityPrices.map(activity =>
                    <Box key={activity.id} alignItems="center" style={{ margin: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { makeBooking(activity.lessons)}}>
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
                                        <Text mt="2" fontSize={12} fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                            Book Now
                                        </Text>
                                    </HStack>
                                </Flex>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                )}


                {/* <Box alignItems="center" style={{ margin: 10 }}>
                    <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { makeBooking(1) }}>
                        <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                            <HStack alignItems="center">
                                <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                                    1 Trial Lesson
                                </Text>
                                <Spacer />
                                <Text mt="2" fontsize="xl" color="red.500">
                                    €4.99
                                </Text>
                            </HStack>


                            <Flex>
                                <HStack alignItems="center">

                                    <Spacer />
                                    <Text mt="2" fontSize={12} fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                        Book Now
                                    </Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </TouchableOpacity>
                </Box>
                <Box alignItems="center" style={{ margin: 10 }}>
                    <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { makeBooking(2) }}>
                        <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                            <HStack alignItems="center">
                                <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                                    2 Trial Lesson
                                </Text>
                                <Spacer />
                                <Text mt="2" fontsize="xl" color="red.500">
                                    €9.99
                                </Text>
                            </HStack>


                            <Flex>
                                <HStack alignItems="center">

                                    <Spacer />
                                    <Text mt="2" fontSize={12} fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                        Book Now
                                    </Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </TouchableOpacity>
                </Box>
                <Box alignItems="center" style={{ margin: 10 }}>
                    <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { props.navigation.navigate("ActivityDetail") }}>
                        <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                            <HStack alignItems="center">
                                <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                                    7 Lesson Tickets
                                </Text>
                                <Spacer />
                                <Text mt="2" fontsize="xl" color="red.500">
                                    €25.99
                                </Text>
                            </HStack>


                            <Flex>
                                <HStack alignItems="center">

                                    <Spacer />
                                    <Text mt="2" fontSize={12} fontWeight="medium" fontSize={"lg"} color="darkBlue.600">
                                        Book Now
                                    </Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </TouchableOpacity>
                </Box> */}

                {/* When clicked on reviews redirected to here, Bottom reviews */}

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
    }
});