import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Header,
    Button,
    Text,
    FormControl,
    Item as FormItem,
    Input,
    Link,
    VStack,
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
import axios from "axios";

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions'

// Custom Components
import CustomText from '../../components/native/CustomText';
import Values from '../../constants/Values';
import CustomInput from '../../components/UI/CustomInput';

import IconButton from '../../components/IconButton/IconButton';

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

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Show password or not
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

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
    const loginUser = () => {

        // console.log(formState, "Custom form and input")

        axios.get("http://localhost:8080/").then(value => {
            console.log(value)
        }).catch(err => {
            console.log("REQUEST FAILED")
            console.log(err)
        })


        // const response = await dispatch(authActions.signUp(formState.inputValues.email, formState.inputValues.password))

        if (formState.inputValidities.email && formState.inputValidities.password) {
            // await Axios.post(`http://localhost:8081/api/v1/user/login`)
            //     .then(async (response) => {
            //         if (response.status === 201) {
            //             // props.navigation.navigate('Home')
            //             // console.log('Submitted')

            //         } else {
            //             console.log('Falsee')
            //         }
            //     })
            // props.navigation.navigate('Home')
            console.log('Submitted')
            console.log(formState)
            // dispatch(authActions.signUp(formState.inputValues.email,formState.inputValues.password))
            setError(null)
            setIsLoading(true)
            try {
                // const response = await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
                props.navigation.navigate('Home')
            } catch (err) {
                Alert.alert("An error occured", err.message, [{ text: "Okay" }])
                setError(err.message)
            }
            setIsLoading(false)
        } else {
            console.log('Validation Failed');
        }
    }

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-150} style={{ marginTop: 300 }}>

                    <Box alignItems="center" style={{ width: "100%" }}>

                        <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                        <CustomText color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">Login to your Account</CustomText>

                        <CustomInput
                            errorText="Please Enter a valid Email"
                            placeholder="Email"
                            onInputChange={inputChangeHandler.bind(this, "email")}
                            leftElement={<MaterialIcons name="account-circle" size={32} color="white" style={styles.inputIcon} />}
                            email
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
                    </Box>

                    <Stack space={1} w="100%" alignItems="center">

                        <Link onPress={() => { props.navigation.navigate('ForgetPassword') }} isUnderlined={true} _text={{ color: Values.textColor }}>
                            Forget Password?
                        </Link>
                        {isLoading ? <ActivityIndicator size={"large"} color={Values.fontPrimary} /> :

                            <Button colorScheme="green" style={styles.customButton} onPress={loginUser}>Login</Button>
                        }
                        <CustomText color="#b3b3ff" italic style={{}}>No account yet? Sign Up Now</CustomText>
                        <Button style={{ width: "30%" }} onPress={() => props.navigation.navigate('Register')}>Register</Button>
                    </Stack>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
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
        paddingRight: 10,
        borderRadius: 100,
    },

    // Styles for Error text under input
    error: {
        color: "#ff0000",
        marginTop: -5,
        marginBottom: 10,
        marginLeft: 15,
    },
})