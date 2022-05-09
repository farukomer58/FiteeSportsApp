import React, { useEffect, useState } from 'react';

import { View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

//Custom
import CustomText from '../../../components/native/CustomText'
import Values from '../../../constants/Values';
import ListItem from '../../../components/UI/ListItem';

export default function AccountOverviewScreen(props) {
    const auth = useSelector(state => state.auth); // Get User Activities of redux 
    const [accountDetails, setAccountDetails] = useState({})


    useEffect(() => {
        console.log("Helllow Fetch user data")
        console.log(auth)
        axios.get(`${Values.apiUrl}/api/v1/users/?id=${auth.userId}`, {
            header: {
                "Authorization": `Bearer ${auth.token}`
            }
        }).then(response => {
            console.log(response.data[0])
            setAccountDetails(response.data[0])
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>

                <View style={styles.head}>
                    <View style={{ alignItems: "center" }}>
                        <MaterialIcons name="account-circle" size={75} color="white" style={styles.inputIcon} />
                        <CustomText title style={styles.userName}>{accountDetails.firstName} {accountDetails.lastName}</CustomText>
                    </View>

                </View>

                <ListItem
                    onPress={() => { props.navigation.navigate("ProfileSettings", { user: accountDetails }) }}
                    listItem="Profile Settings"
                    listItemIcon={<MaterialIcons name="settings" size={40} color="white" style={styles.inputIcon} />}
                />
                <ListItem
                    onPress={() => { props.navigation.navigate("Bookings") }}
                    listItem="Bookings"
                    listItemIcon={<MaterialIcons name="history" size={40} color="white" style={styles.inputIcon} />}
                />
                <ListItem
                    onPress={() => { props.navigation.navigate("BankDetail") }}
                    listItem="Bank Detail"
                    listItemIcon={<MaterialIcons name="payment" size={40} color="white" style={styles.inputIcon} />}
                />
                <View style={{ backgroundColor: "black", height: 1, margin: 5 }} />
                <ListItem
                    onPress={() => { props.navigation.navigate("UserActivities") }}
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