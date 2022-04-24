import React from 'react'
import { Platform, View } from 'react-native'
import Values from '../constants/Values';
import { BlurView } from 'expo-blur';

export const defaultNavOptions = {
    // headerShown: false,
    headerStyle: {
        // display: "none",
        backgroundColor: Platform.OS === 'android' ? Values.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'nunito-regular-bold',
        color: Values.textColorBlack,
        alignItems: "center",
        justifyContent: "center",
    },
    headerBackTitleStyle: {
        fontFamily: 'nunito-regular'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Values.primaryColor,
    
    tabBarStyle: {
        backgroundColor: Values.primaryColor,
        // height: 55,  
    },
    tabBarActiveTintColor:"red",
    tabBarInactiveTintColor:"green",

    // tabBarBackground: () => (
    //     <View style={{ backgroundColor: "red" }} />
    // ),
};

const defaultNoShowOptions = {
    headerShown: false,
}