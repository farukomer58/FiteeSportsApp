import React, { Component } from 'react';

import { View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Custom
import CustomText from '../../../components/native/CustomText'
import Values from '../../../constants/Values';
import ListItem from '../../../components/UI/ListItem';

export default function AccountOverviewScreen(props) {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>

                <View style={styles.head}>
                    <View style={{ alignItems: "center" }}>
                        <MaterialIcons name="account-circle" size={75} color="white" style={styles.inputIcon} />
                        <CustomText title style={styles.userName}>User Full Name</CustomText>
                    </View>

                </View>

                <ListItem
                    onPress={() => { props.navigation.navigate("Activities") }}
                    listItem="Profile Settings"
                    listItemIcon={<MaterialIcons name="settings" size={40} color="white" style={styles.inputIcon} />}
                />
                <ListItem
                    onPress={() => { props.navigation.navigate("Activities") }}
                    listItem="Bookings"
                    listItemIcon={<MaterialIcons name="history" size={40} color="white" style={styles.inputIcon} />}
                />
                <ListItem
                    onPress={() => { props.navigation.navigate("Activities") }}
                    listItem="Bank Detail"
                    listItemIcon={<MaterialIcons name="payment" size={40} color="white" style={styles.inputIcon} />}
                />
                <View style={{ backgroundColor: "black", height: 1, margin: 5 }} />
                <ListItem
                    onPress={() => { props.navigation.navigate("Activities") }}
                    listItem="Own Activities"
                    listItemIcon={<MaterialIcons name="list" size={40} color="white" style={styles.inputIcon} />}
                />
            </View>
        </ScrollView>
    )
}

export const screenOptions = navData => {
    return {
        headerShown: false,
        headerTitle: "Account",
        title: 'Account',
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
        // headerLeft: (props) => (
        //     <Text>Hello</Text>
        // )
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#313131"
    },

    userName: {
        marginTop: 20,
    },

    head: {
        backgroundColor: "#1F292E", // or #415058
        padding: 10,
        // height: "20%",
        justifyContent: "center",
    },

    rowView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },


    customButton: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    }
})