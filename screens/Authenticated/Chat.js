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
    IconButton,
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

export default function ChatScreen(props) {
    return (
        <View style={styles.background}>
            {/* <Header /> */}
            <Text>Chat</Text>
            {/* <Footer /> */}
            <HStack space={2}>
                <Input flex={1} onChangeText={v => setInputValue(v)}  placeholder="Message" />
                {/* <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                    addItem(inputValue);
                    setInputValue("");
                }} /> */}
            </HStack>
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