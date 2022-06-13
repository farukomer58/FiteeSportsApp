import React, { useState, useReducer, useEffect, useCallback } from 'react';
import {
    Button,
    Text,
    Checkbox,
    Center,
    HStack,
    Item as FormItem,
    Link,
    Modal,
    Box,
    Stack,
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

    switch (action.type) {
        case "UPDATE": {
            const updatedValues = { ...state.inputValues, [action.input]: action.value }
            const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid }

            let formIsValid = true
            for (const key in updatedValidities) {
                formIsValid = formIsValid && updatedValidities[key]
            }
            return { ...state, inputValues: updatedValues, inputValidities: updatedValidities, formIsValid: formIsValid }
        }
        case "CLEAR":
            return defaultForm;
        default:
            return state;
    }
}
const defaultForm = {
    inputValues: {
        fullName: "",
        email: "",
        birthDate: "",
        password: "",
    },
    inputValidities: {
        fullName: false,
        email: false,
        birthDate: false,
        password: false,
    },
    formIsValid: false,
}
const defaultProfessions = [
    { name: "Yoga", pressed: false }, { name: "Fitness", pressed: false },
    { name: "Combat Sports", pressed: false }, { name: "Athletics", pressed: false },
    { name: "Gymnastics", pressed: false }, { name: "Other", pressed: false }
]
export default function RegisterScreen(props) {

    const dispatch = useDispatch();                                         // Redux dispatch

    const [show, setShow] = useState(false);                                // Show password or not
    const handleClick = () => setShow(!show);

    const [isLoading, setIsLoading] = useState(false)                       // Is busy with request....

    const [selectedUserType, setSelectedUserType] = useState("CUSTOMER")    // Registering as ....
    const [isNextStep, setIsNextStep] = useState(false)                     // Registering as Freelancer show advanced register options or not

    const [modalVisible, setModalVisible] = useState(false);                // Show modal term of condition or not

    const [agreed, setAgreed] = useState(false);                            // Agreed to the Terms of Condition or not
    const [formState, dispatchForm] = useReducer(formReducer, defaultForm)  // Form Reducer with all values and validatity values


    const [freelancerProfessions, setFreelancerProfessions] = useState(     // Professions type to choose from for Freelancer
        defaultProfessions
    )
    const updateOpacity = (index, value) => {

        const professions = [...defaultProfessions]
        professions[index]["pressed"] = true

        setFreelancerProfessions(old => [...professions])
    }

    // Handler when user input changes, updates reducer state 
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
        dispatchForm({ type: "UPDATE", value: inputValue, isValid: inputIsValid, input: inputIdentifier })
    }, [dispatchForm])

    // Clear Register form and navigate back to login page
    const returnToLoginScreen = () => {
        dispatchForm({ type: "CLEAR" })
        props.navigation.replace("Login")
    }

    // Register User Handler
    const registerUser = async () => {
        if (formState.formIsValid && agreed) {
            setIsLoading(true)
            try {
                const response = await dispatch(authActions.signUp(formState.inputValues, selectedUserType))
                setIsLoading(false)
                Alert.alert("Registration succesfull", "Your registration has completed successfully, please Login screen to enter the application", [{ text: "Return To Login", onPress: () => returnToLoginScreen() }])
            } catch (error) {
                Alert.alert("Registration failed", "Please Enter all fields correctly", [{ text: "Okay" }])
                setIsLoading(false)
            }
            // Dispacth to redux and send request backend
            // show succes or failure alert
        } else {
            Alert.alert("Something went wrong", "Could you please make sure that you have entered all fields correctly", [{ text: "Okay" }])
            console.log('Validation Failed');
            // props.navigation.navigate("RegisterSuccesfull")
            // console.log(agreed)
        }
    }

    // When User type = FREELANCER go to extra register options screen for additional information
    const goNextStep = () => {
        if (formState.formIsValid && agreed) {
            setIsNextStep(true)
        } else {
            // setIsNextStep(true)
            Alert.alert("Please Enter the required fields correctly In order to Continue")
        }
    }

    // Set content to Customer Register or Extra step for Freelancer register
    let content;
    if (isNextStep) {
        content = (
            <Stack space={3} alignItems="center">
                {
                    /* <Heading>HStack</Heading> */
                }

                {freelancerProfessions.map((profession, index) => (
                    <HStack key={profession.name} space={3} justifyContent="center">
                        <TouchableOpacity onPress={() => { updateOpacity(index, true) }} activeOpacity={profession.opacity}><Center h="20" w="40" bg={profession.pressed ? "green.700" : "green.500"} rounded="md" shadow={3} _text={{
                            color: "white"
                        }}>
                            {profession.name}
                        </Center>
                        </TouchableOpacity>

                    </HStack>
                ))}
                <Button colorScheme="green" onPress={() => registerUser()}>Register</Button>

            </Stack>
        )
    } else {
        content = (
            <Stack space={3} w="65%" alignItems="center">
                <Button.Group isAttached colorScheme="green" mx={{
                    base: "auto",
                    md: 0
                }} size="lg" borderRadius="lg">
                    <Button variant={selectedUserType === 'FREELANCER' ? "outline" : "solid"} onPress={() => setSelectedUserType("CUSTOMER")}>Customer</Button>
                    <Button variant={selectedUserType === 'FREELANCER' ? "solid" : "outline"} onPress={() => setSelectedUserType("FREELANCER")}>Freelancer</Button>
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
                    {(selectedUserType === "CUSTOMER") ? <Button colorScheme="green" style={styles.customButton} onPress={registerUser} key={1}>Register</Button> : <Button key={2} style={styles.customButton} onPress={() => goNextStep()}>Next</Button>}
                </>
                }

                {/* <Text color="#b3b3ff" underline style={{ textAlign: "left" }}>Already an account? Login now</Text> */}
                <Link onPress={() => { returnToLoginScreen() }} isUnderlined={true} _text={{ color: Values.textColor }} style={{ paddingBottom: 20 }}>
                    Already an account? Login now
                </Link>
            </Stack>
        )
    }

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
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