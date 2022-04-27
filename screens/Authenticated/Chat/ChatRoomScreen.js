import React, { Component } from 'react';
import {
    Container,
    Header,
    Button,
    Item as FormItem,
    Link,
    Box,
    Stack,
} from 'native-base';
import { View, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChatRoomScreen(props) {
    return (
        <View style={styles.background}>
            {/* <Header /> */}

            <Button title="Show Chat" onPress={() => { props.navigation.navigate("ChatConversation") }} style={{ marginVertical: 5 }}>Show Chat </Button>

        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerShown:false,
        headerTitle: "Chat",
        title: 'Chat',
        tabBarBadge: 3,
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
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