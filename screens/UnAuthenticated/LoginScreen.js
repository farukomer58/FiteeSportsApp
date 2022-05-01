import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    Container,
    Header,
    Button,
    Item as FormItem,
    Link,
    Box,
    Stack,
} from 'native-base';

import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import Axios from "axios";
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions'

// Custom Components
import CustomText from '../../components/native/CustomText';
import CustomInput from '../../components/UI/CustomInput';
import IconButton from '../../components/IconButton/IconButton';

import Values from '../../constants/Values';
import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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
export default function LoginScreen(props) {

    const dispatch = useDispatch();
    // Show password or not
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    })

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputIsValid) => {
        dispatchForm({ type: "UPDATE", value: inputValue, isValid: inputIsValid, input: inputIdentifier })
    }, [dispatchForm])

    // Login user func, first validate
    const loginUser = async () => {

        if (formState.formIsValid) {
            setIsLoading(true)
            try {
                const response = await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
                console.log(response.data)
            } catch (err) {
                Alert.alert("An error occured", err.message, [{ text: "Okay" }])
                // setError(err.message)
            }
            setIsLoading(false)
        } else {
            // console.log('Validation Failed');
            Alert.alert("Something went wrong", "Could you please make sure that you have entered all fields correctly", [{ text: "Okay" }])
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        // MyFunction()
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-150} style={{ marginTop: 275 }}>

                    <Stack space={3} w="100%" alignItems="center">

                        <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                        <CustomText color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">Login to your Account</CustomText>

                        <CustomInput
                            leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
                            errorText="Please Enter a valid Email"
                            placeholder="Email"
                            onInputChange={inputChangeHandler.bind(this, "email")}
                            email
                            required
                            testId="emailInput"
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
                            // minLength={6}
                            secureTextEntry={!show}
                            testId="passwordInput"
                        />
                    </Stack>
                    <Stack space={1} w="100%" alignItems="center" style={{ marginTop: 15 }}>

                        <Link onPress={() => { props.navigation.navigate('ForgetPassword') }} isUnderlined={true} _text={{ color: Values.textColor }}>
                            Forget Password?
                        </Link>
                        {isLoading ? <ActivityIndicator size={"large"} color={Values.fontPrimary} /> :

                            <Button colorScheme="green" style={styles.customButton} onPress={loginUser} testID="loginButton">Login</Button>
                        }
                        <CustomText color="#b3b3ff" italic style={{}}>No account yet? Sign Up Now</CustomText>
                        <Button style={{ width: "30%" }} onPress={() => props.navigation.navigate('Register')}>Register</Button>
                    </Stack>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "Login",
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
        // border: "red",
    },

    customButton: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
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
        // borderRadius: 100,
    },
})