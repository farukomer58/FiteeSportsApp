import React from 'react'
import { Platform, View, Text } from 'react-native'
import Values from '../constants/Values';
import { BlurView } from 'expo-blur';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../components/UI/HeaderButton'
import CustomHeaderButton from '../components/UI/HeaderButton';

const submitHandler = (async () => {
    console.log("header right button pressed")
});


export const defaultNavOptions = navData => {
    return {
        // headerShown: false,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Values.primaryColorDark : '',
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontFamily: 'nunito-regular-bold',
            // color: Values.textColorBlack,
            alignItems: "center",
            justifyContent: "center",
        },
        headerBackTitleStyle: {
            fontFamily: 'nunito-regular'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Values.primaryColor,
        tabBarStyle: {
            backgroundColor: Values.primaryColorDark,
            // height: 55,  
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b9c883",

        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'notifications-outline' : 'notifications'
                    }
                    onPress={submitHandler}
                />
            </HeaderButtons>
            // <Text>sadsa</Text>
        )
    }
};

const defaultNoShowOptions = {
    headerShown: false,
}