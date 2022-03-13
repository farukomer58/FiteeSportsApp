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
    Title,
    Icon,
    Box,
    Heading,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
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
            <View>
                {/* <PressableCard /> */}
                <Card />
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