import React, { Component } from 'react';
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
    Icon,
    IconButton,
    Box,
    Stack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Axios from "axios";

// Custom Components
import CustomText from '../../components/native/CustomText';
import Values from '../../constants/Values';

export default function LoginScreen(props) {

    // Show password or not
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        emailValid: true,
        passwordValid: true,
    });
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formData.email === undefined) {
            setErrors({
                ...errors,
                email: 'Email is required'
            });
            return false;
        } else if (formData.email.length < 3) {
            setErrors({
                ...errors,
                email: 'Email is too short'
            });
            return false;
        }

        return true;
    }

    const inputChange = (key, value) => {
        if (key === 'email') {
            const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regexEmail.test(value)) {
                setFormData({ ...formData, [key]: value, emailValid: true })
            } else {
                setFormData({ ...formData, [key]: value, emailValid: false })
            }
        }

        if (key === 'password') {
            if (value.length >= 6) {
                setFormData({ ...formData, [key]: value, passwordValid: true })
            } else {
                setFormData({ ...formData, [key]: value, passwordValid: false })
            }
        }
    }

    const loginUser = async () => {
        if (formData.emailValid && formData.passwordValid) {
            // await Axios.post(`http://localhost:8081/api/v1/user/login`)
            //     .then(async (response) => {
            //         if (response.status === 201) {
            //             // props.navigation.navigate('Home')
            //             // console.log('Submitted')
                        
            //         } else {
            //             console.log('Falsee')
            //         }
            //     })
                props.navigation.navigate('Home')
                console.log('Submitted')
                

        } else {
            console.log('Validation Failed');
        }
    }


    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            <View style={{ marginTop: 200 }}>
                <Box alignItems="center">
                    <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                    <CustomText color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">Login to your Account</CustomText>
                    <Stack space={2} w="100%" alignItems="center">
                        <Input
                            style={styles.input}
                            color="white"
                            variant="rounded"
                            w={{
                                base: "75%",
                                md: "25%"
                            }}
                            InputLeftElement={<MaterialIcons name="account-circle" size={32} color="white"
                                style={{ padding: 10 }} />}
                            placeholder="Email"
                            onChangeText={value => inputChange("email", value)}
                        />
                        {!formData.emailValid ? <Text fontSize="sm" style={styles.error} >Enter a valid Email</Text> : null}

                        <Input
                            style={styles.input}
                            color="white"
                            variant="rounded"
                            w={{
                                base: "75%",
                                md: "25%"
                            }}
                            InputLeftElement={<Ionicons name="key-outline" size={32} color="white"
                                style={{ padding: 10 }} />} placeholder="Password"
                            type={show ? "customtext" : "password"}
                            InputRightElement={
                                <IconButton color="white" key={"solid"}
                                    _icon={{ as: Ionicons, name: show ? "eye-off-outline" : "eye-outline", color: "white" }}
                                    onPress={handleClick}
                                />
                            }
                            onChangeText={value => inputChange("password", value)}
                        />
                        {!formData.passwordValid ? <Text fontSize="sm" style={styles.error} >Password must be at least 6 characters</Text> : null}


                        <Link onPress={() => { props.navigation.navigate('ForgetPassword') }} isUnderlined={true} _text={{ color: Values.textColor }}>
                            Forget Password?
                        </Link>

                        <Button colorScheme="green" style={styles.customButton} onPress={loginUser} disabled={formData.email.length<=0}>Login</Button>
                        <CustomText color="#b3b3ff" italic underline style={{}}>No account yet? Sign Up Now</CustomText>

                        <Button style={{ width: "30%" }} onPress={() => props.navigation.navigate('Register')}>Register</Button>

                    </Stack>
                </Box>
            </View>
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
        color: "white",
    },

    customButton: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },

    error: {
        color: "#ff0000",
        marginTop: -5,
    },
})