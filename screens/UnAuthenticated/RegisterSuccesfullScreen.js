import React, { useReducer, useState, useCallback } from 'react';
import { Constants } from 'expo'
import {
    Button,
    Item as FormItem,
    Box,
    Stack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import axios from "axios";
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions'

// Custom Components
import CustomText from '../../components/native/CustomText';
import CustomInput from '../../components/UI/CustomInput';
import IconButton from '../../components/IconButton/IconButton';

import Values from '../../constants/Values';

export default function RegisterSuccesfullScreen(props) {


    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
        <View style={{ marginTop: 200 }}>
            <Box alignItems="center">
                <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                <CustomText color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">Forget Password? Fill in your email</CustomText>
                <Stack space={2} w="100%" alignItems="center">

                    {/* <CustomInput
                        leftElement={<AntDesign name="mail" size={32} color="white" style={styles.inputIcon} />}
                        errorText="Please Enter a valid Email"
                        placeholder="Email"
                        onInputChange={inputChangeHandler.bind(this, "email")}
                        email
                        required
                    />

                    {/* <Button colorScheme="green" style={styles.customButton} onPress={sendForgetRequest}>Send Password Reset mail</Button> */}

                    <CustomText color="#b3b3ff" italic underline style={{}}>No account yet? Sign Up Now</CustomText>
                    <Button style={{ width: "30%" }} onPress={() =>{}}>Register</Button> 

                </Stack>
            </Box>
        </View>
    </ImageBackground>
    )
}


export const screenOptions = navData => {
    return {
        headerTitle: "Forget Password",
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
        // alignItems:"center"
    },
    imageContainer:{width:"80%",height:250},
    image: {
        width: 175,
        height: 100,
    },
    inputIcon: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingBottom: 15,
        paddingRight: 0,
        // color:"red"
    },

    customButton: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },

    image: {
        width: '100%',
        height: '100%'
    },

    error: {
        color: "#ff0000",
        marginTop: -5,
    },
})