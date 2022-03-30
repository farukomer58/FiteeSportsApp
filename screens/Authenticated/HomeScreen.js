import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,

    Center,
    Heading,
    HStack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import PressableCard from '../../components/PressableCard';
import Card from '../../components/Card';

export default function HomeScreen(props) {

    return (
        <View style={styles.background}>
            <Header />
            <Heading size="md" ml="-1" color="white" p={2}>
                Populair
            </Heading>


            <ScrollView px={90} horizontal={true} _contentContainerStyle={{
                bg: "lime.300",
                px: "44px",
                w: "100%"
            }} // style={{ backgroundColor: 'blue' }}
                height={200}>
                <HStack>
                    {["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"].map(val => (
                        <PressableCard />
                    )
                    )}
                </HStack>
            </ScrollView>

            

            <Button title="Show Chat Rooms" onPress={() => { props.navigation.navigate("ChatRoom") }} >Show Chat Rooms</Button>
            <Button title="Show Chat" onPress={() => { props.navigation.navigate("Chat") }} >Show Chat </Button>
            <Button title="Show Calendar" onPress={() => { props.navigation.navigate("Calendar") }} >Show Calendar</Button>
            <Button title="Show Calendar" onPress={() => { props.navigation.navigate("Calendar") }} >Show Calendar</Button>
            <View>
                {/* <PressableCard /> */}
                {/* <Card /> */}
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: "100%",
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