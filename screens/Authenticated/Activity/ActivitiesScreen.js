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

import { View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Custom
import PressableCard from '../../../components/PressableCard';
import Card from '../../../components/Card';

import Values from '../../../constants/Values';

export default function ActivitiesScreen(props) {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.background}>
                <HStack alignItems="center">
                    <Heading size="md" ml="-1" color="white" p={2}>
                        All Activities
                    </Heading>
                </HStack>

                <ScrollView horizontal={true} height={280} >
                    {/* style={{ backgroundColor: 'blue' }} */}
                    <HStack>
                        {["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"].map(val => (
                            <PressableCard key={val} navigation={props.navigation} />
                        )
                        )}
                    </HStack>
                </ScrollView>

            </View>
        </ScrollView>

    )
}

export const screenOptions = navData => {
    return {
        headerShown: false,
        headerTitle: "Activities",
        title: 'Discover',
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
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
    }
})