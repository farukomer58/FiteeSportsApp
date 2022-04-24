import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Header,
    Button,
    Text,
    Checkbox,
    Body,
    Form,
    Center,
    HStack,
    Item as FormItem,
    Input,
    Link,
    Title,
    Icon,
    Modal,
    Box,
    Stack,
    useToast,
    // Alert,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { Ionicons, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';

import axios from "axios";
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions'

// Custom Components
import CustomText from '../../components/native/CustomText';
import CustomInput from '../../components/UI/CustomInput';
import IconButton from '../../components/IconButton/IconButton';

import Values from '../../constants/Values';

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
export default function RegisterScreen(props) {

    // Redux dispatch
    const dispatch = useDispatch();

    // Show password or not
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [date, setDate] = useState('09-10-2021');

    const [selectedUserType, setSelectedUserType] = useState("customer")
    const [isNextStep, setIsNextStep] = useState(false)

    const [agreed, setAgreed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            fullName: "",
            email: "",
            birthDate: "",
            phone: "",
            password: "",
        },
        inputValidities: {
            fullName: false,
            email: false,
            birthDate: false,
            phone: false,
            password: false,
        },
        formIsValid: false,
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
        dispatchForm({ type: "UPDATE", value: inputValue, isValid: inputIsValid, input: inputIdentifier })
    }, [dispatchForm])


    const registerUser = () => {
        if (formState.formIsValid && agreed) {
            props.navigation.navigate('Home')
            console.log('Registered')

            // Dispacth to redux and send request backend
            // show succes or failure alert
        } else {
            console.log('Validation Failed');
            // console.log(agreed)
        }
    }

    const goNextStep = () => {
        if (formState.formIsValid && agreed) {
            setIsNextStep(true)
        } else {
            setIsNextStep(true)
            // Alert.alert("Please Enter the required fields correctly In order to Continue")
        }
    }

    // Customer Register or Extra step for Freelancer register
    let content;
    if (isNextStep) {
        content = (
            <Stack space={3} alignItems="center">
                {
                    /* <Heading>HStack</Heading> */
                }
                <HStack space={3} justifyContent="center">
                    <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="green.500" rounded="md" shadow={3} _text={{
                        color: "white"
                    }}>
                        Yoga
                    </Center>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="primary.500" rounded="md" _text={{
                        color: "white"
                    }} shadow={3}>
                        Fitness
                    </Center>
                    </TouchableOpacity>
                </HStack>

                <HStack space={3} justifyContent="center">
                    <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="secondary.500" rounded="md" shadow={3} _text={{
                        color: "white"
                    }}>
                        Calisthenics
                    </Center>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Center h="20" w="40" bg="emerald.700" rounded="md" _text={{
                            color: "white"
                        }} shadow={3}>
                            Fitness
                        </Center>
                    </TouchableOpacity>
                </HStack>
                <HStack space={3} justifyContent="center">
                    <TouchableOpacity activeOpacity={0.8}>
                        <Center h="20" w="40" bg="green.500" rounded="md" shadow={3} _text={{
                            color: "white"
                        }}>
                            Yoga
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>

                        <Center h="20" w="40" bg="primary.700" rounded="md" _text={{
                            color: "white"
                        }} shadow={3}>
                            Other
                        </Center>
                    </TouchableOpacity>


                </HStack>


                {/* <Checkbox value="one" my={2}>
                        <Text color={"white"}>
                            Yes, I understand and agree to the Fitee
                            Terms of Service

                        </Text>
                    </Checkbox> */}
                <Button colorScheme="green" onPress={() => props.navigation.navigate('Home')}>Register</Button>

            </Stack>
        )
    } else {
        content = (
            <Stack space={3} w="65%" alignItems="center">
                <Button.Group isAttached colorScheme="green" mx={{
                    base: "auto",
                    md: 0
                }} size="lg" borderRadius="lg">
                    <Button variant={selectedUserType === 'freelancer' ? "outline" : "solid"} onPress={() => setSelectedUserType("customer")}>Customer</Button>
                    <Button variant={selectedUserType === 'freelancer' ? "solid" : "outline"} onPress={() => setSelectedUserType("freelancer")}>Freelancer</Button>
                </Button.Group>

                <CustomInput
                    leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
                    placeholder="Full Name"
                    errorText="Please Enter a valid Full Name"
                    // errorText2="Full Name must be at least 3 characters"
                    onInputChange={inputChangeHandler.bind(this, "fullName")}
                    required
                    minLength={3}
                    multiline
                />
                <CustomInput
                    leftElement={<AntDesign name="mail" size={32} color="white" style={styles.inputIcon} />}
                    errorText="Please Enter a valid Email"
                    placeholder="Email"
                    onInputChange={inputChangeHandler.bind(this, "email")}
                    email
                    required
                />
                <CustomInput
                    leftElement={<AntDesign name="calendar" size={32} color="white" style={styles.inputIcon} />}
                    placeholder="Date Of Birth (dd-mm-yyyy)"
                    errorText="Please Enter a valid Date"
                    onInputChange={inputChangeHandler.bind(this, "birthDate")}
                />
                <CustomInput
                    leftElement={<AntDesign name="phone" size={32} color="white" style={styles.inputIcon} />}
                    errorText="Please Enter a valid Phone Number"
                    placeholder="(+44) 999 999 999"
                    onInputChange={inputChangeHandler.bind(this, "phone")}
                    required
                />
                <CustomInput
                    leftElement={<Ionicons name="key-outline" size={32} color="white" style={styles.inputIcon} />}
                    placeholder="Password"
                    errorText="Please Enter a valid Password"
                    onInputChange={inputChangeHandler.bind(this, "password")}
                    rightElement={<IconButton onPress={handleClick} >
                        <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={32} color="white" style={styles.inputIconRight} />
                    </IconButton>}
                    required
                    minLength={6}
                    secureTextEntry={!show}
                />

                <Checkbox value="one" color="white" style={{ margin: 10 }} onChange={(state) => setAgreed(oldState => !oldState)}>
                    <CustomText>
                        Yes, I understand and agree to the Fitee
                        <Link onPress={() => { setModalVisible(!modalVisible); }} isUnderlined={true} _text={{ color: Values.textColor }} r>
                            Terms of Service
                        </Link>
                    </CustomText>
                </Checkbox>

                {isLoading ? <ActivityIndicator size={"large"} color={Values.fontPrimary} /> : <>
                    {(selectedUserType === "customer") ? <Button colorScheme="green" style={styles.customButton} onPress={registerUser} key={1}>Register</Button> : <Button key={2} style={styles.customButton} onPress={() => goNextStep()}>Next</Button>}
                </>
                }
                {/* <Button onPress={() => setIsNextStep(true)}>Next</Button> */}
                {/* (selectedUserType === "customer") */}

                {/* <Text color="#b3b3ff" underline style={{ textAlign: "left" }}>Already an account? Login now</Text> */}
                <Link onPress={() => { props.navigation.navigate('Login') }} isUnderlined={true} _text={{ color: Values.textColor }} style={{ paddingBottom: 20 }}>
                    Already an account? Login now
                </Link>
            </Stack>
        )
    }

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            {/* <View style={{ marginTop: 100 }}> */}
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-150} style={{ marginTop: 80 }}>
                    <Box alignItems="center">
                        <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                        <Text color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">{isNextStep ? "Choose Activity Type" : "Create an Account as a"}</Text>
                        {content}
                    </Box>

                    <Modal isOpen={modalVisible} onClose={setModalVisible} size={"lg"}>
                        <Modal.Content maxH="400">
                            <Modal.CloseButton />
                            <Modal.Header>Return Policy</Modal.Header>
                            <Modal.Body>
                                <ScrollView>
                                    <Text>
                                        Create a 'Return Request' under “My Orders” section of
                                        App/Website. Follow the screens that come up after tapping on
                                        the 'Return’ button. Please make a note of the Return ID that we
                                        generate at the end of the process. Keep the item ready for pick
                                        up or ship it to us basis on the return mode.
                                        Create a 'Return Request' under “My Orders” section of
                                        App/Website. Follow the screens that come up after tapping on
                                        the 'Return’ button. Please make a note of the Return ID that we
                                        generate at the end of the process. Keep the item ready for pick
                                        up or ship it to us basis on the return mode.
                                        Create a 'Return Request' under “My Orders” section of
                                        App/Website. Follow the screens that come up after tapping on
                                        the 'Return’ button. Please make a note of the Return ID that we
                                        generate at the end of the process. Keep the item ready for pick
                                        up or ship it to us basis on the return mode.
                                    </Text>
                                </ScrollView>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    {/* <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setModalVisible(false);
                                    }}>
                                        Cancel
                                    </Button> */}
                                    <Button onPress={() => {
                                        setModalVisible(false);
                                    }}>
                                        Ok
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>

                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "Register",
        // title: 'Home',
        // tabBarIcon: ({ color }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={26} />
        // ),
        // headerLeft: (props) => (
        //     <Text>Hello</Text>
        // )
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: "center",
    },

    image: {
        width: 175,
        height: 100,
    },

    input: {
        color: "white",
    },

    customButton: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 50
    },

    datePickerStyle: {
        width: "75%",
    },

    inputIcon: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingBottom: 15,
        paddingRight: 0,
        // color:"red"
    },
    inputIconRight: {
        paddingTop: 15,
        paddingLeft: 0,
        paddingBottom: 15,
        paddingRight: 20,
        marginLeft: -10,
        // backgroundColor:"red"
        // borderRadius: 100,
    },

    error: {
        color: "#ff0000",
        marginTop: -12,
    },
})