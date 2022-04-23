import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Link,
    Label,

    Spacer,
    Heading,
    HStack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';


//Custom

import Header from '../../../components/Header';
import PressableCard from '../../../components/PressableCard';
import Card from '../../../components/Card';

import CustomText from '../../../components/native/CustomText'
import Values from '../../../constants/Values';
import ListItem from '../../../components/UI/ListItem';

import style from 'react-native-datepicker/style';

export default function AccountOverview(props) {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>

                <Header />


                <View style={styles.head}>
                    <View style={{alignItems:"center"}}>
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