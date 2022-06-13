import React, { useState, useEffect, useReducer, useCallback } from 'react';
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

import { View, TextInput, Image, StyleSheet, ImageBackground, ScrollView, Button, FlatList, TouchableOpacity, ActivityIndicator, Modal, Pressable, Alert } from 'react-native'
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
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import CustomDefaultInput from '../../../components/UI/CustomDefaultInput';

const formReducer = (state, action) => {
    if (action.type === "UPDATE") {
        const updatedValues = { ...state.inputValues, [action.input]: action.value }
        const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid }

        let formIsValid = true
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }

        return { ...state, inputValues: updatedValues, inputValidities: updatedValidities, formIsValid: formIsValid }
    }
    return state;
}
export default function ActivityDetailScreen(props) {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); // Get User Activities of redux 

    const [activityId, setActivityId] = useState(props.route.params.activityId)
    const [activityDetail, setActivityDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState();

    // Input values needed for making a Booking
    const [threeInput, setThreeInput] = useState({
        name: activityDetail.ownerName ? activityDetail.ownerName : "",
        cardNumber: "",
        cvc: "",
        expireMonth: "",
        expireYear: ""
    });
    const threeInputChange = (fieldName, value) => {
        setThreeInput({ ...threeInput, [fieldName]: value })
    }

    // activityId
    const fetchActivityById = async () => {
        const result = await dispatch(activityActions.fetchActivityById(activityId))
        setActivityDetail(result.data.content[0])
        setIsLoading(false)
    }

    const makeBooking = (priceObj) => {
        setModalVisible(true)
        setSelectedPrice(oldPrice => priceObj)
    }
    const makeBookingFinal = () => {

        // console.log("I made Bookings")
        // console.log("Filled in details")
        // console.log(threeInput)

        const body = {
            numberOfLessons: selectedPrice.lessons,
            activityId: activityId,
            userId: auth.userId
        }
        console.log(body)
        // dispatch(bookingActions.makeBooking(body))
        // TODO: Put in State and dont require to fetch from api when still on this screen

        Alert.alert("Booking Made Succesfully")
        // Alert succes and hide modal
        setModalVisible(modalVisiblty => !modalVisiblty)
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
                        <DatesCard key={val.date} navigation={props.navigation} date={val} activityId={activityDetail.id} />
                    )
                    )}
                </ScrollView>

                {/* Booking Options / Show All Prices, and give the User option to purchase Lessons */}
                <Heading size="md" ml="-1" color="white" p={2}> Price </Heading>
                {activityDetail.activityPrices.map(activityPrice =>
                    <Box key={activityPrice.id} alignItems="center" style={{ margin: 10 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { makeBooking(activityPrice) }}>
                            <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >

                                <HStack alignItems="center">
                                    <Text color="coolGray.800" fontWeight="medium" fontSize="md">
                                        {activityPrice.lessons} Lesson Tickets
                                    </Text>
                                    <Spacer />
                                    <Text mt="2" fontsize="xl" color="red.500">
                                        €{activityPrice.price.toFixed(2)}
                                    </Text>

                                </HStack>
                                {activityPrice.discount > 0 && <Text mt="2" fontsize="xl" color="red.500">
                                    -%{activityPrice.discount.toFixed(2)}
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



            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ ...styles.centeredView }}>
                        <View style={{ ...styles.modalView, justifyContent: "space-between" }}>

                            <View>
                                <CustomText style={styles.modalText}>Total: €{selectedPrice ? Math.round(selectedPrice.price.toFixed(2) * 100) / 100 : 1}</CustomText>
                                <CustomText style={styles.modalText}>Lessons: {selectedPrice ? selectedPrice.lessons : 1}</CustomText>

                                <View style={styles.form}>
                                    <View style={styles.formControl}>
                                        <TextInput
                                            placeholder="Name"
                                            style={styles.input}
                                            placeholderTextColor="#C6C6C6"
                                            color="white"
                                            keyboardType='numeric'
                                            value={threeInput.name}
                                            onChangeText={(value) => { threeInputChange("name", value) }}
                                        />
                                    </View>
                                    <View style={styles.formControl}>
                                        <TextInput
                                            placeholder="Card Number"
                                            style={styles.input}
                                            placeholderTextColor="#C6C6C6"
                                            color="white"
                                            keyboardType='numeric'
                                            value={threeInput.cardNumber}
                                            onChangeText={(value) => { threeInputChange("cardNumber", value) }}
                                        />
                                    </View>
                                    <View style={Styles.flexDirectionRowSpace}>
                                        <TextInput
                                            placeholder="cvc"
                                            style={styles.input}
                                            placeholderTextColor="#C6C6C6"
                                            color="white"
                                            keyboardType='numeric'
                                            value={threeInput.cvc}
                                            onChangeText={(value) => { threeInputChange("cvc", value) }}
                                        />
                                        <TextInput
                                            placeholder="expireMonth"
                                            style={styles.input}
                                            placeholderTextColor="#C6C6C6"
                                            color="white"
                                            keyboardType='numeric'
                                            value={threeInput.expireMonth}
                                            onChangeText={(value) => { threeInputChange("expireMonth", value) }}
                                        />
                                        <TextInput
                                            placeholder="expireYear"
                                            style={styles.input}
                                            placeholderTextColor="#C6C6C6"
                                            color="white"
                                            keyboardType='numeric'
                                            value={threeInput.expireYear}
                                            onChangeText={(value) => { threeInputChange("expireYear", value) }}
                                        />
                                    </View>

                                    {/* <Button colorScheme="green" style={styles.customButton} onPress={updateProfile} key={1}>Update Bank Details</Button> */}

                                </View>

                            </View>


                            {/* Modal Control Buttons */}
                            <View style={Styles.flexDirectionRowSpace}>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => makeBookingFinal()}
                                >
                                    <Text style={styles.textStyle}>Make Booking</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.99)',
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: Values.primaryColorDark,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },


    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'nunito-regular-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },


});