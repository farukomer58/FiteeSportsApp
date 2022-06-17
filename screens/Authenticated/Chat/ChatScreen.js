import React, { useState } from 'react';

import { View, Image, StyleSheet, ImageBackground, ScrollView, TextInput, Text } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Values from '../../../constants/Values';

export default function ChatScreen(props) {

    const [input, setInput] = useState("")

    return (
        <View style={styles.background}>
            <View>
                <View style={styles.chatBubble}>
                    <Text>Lrorem lrorem loremoore</Text>
                </View>
                <View style={styles.chatBubble}>
                    <Text>Lrorem lrorem loremoore</Text>
                </View>
                <View style={styles.ownChatBubble}>
                    <Text>Lrorem lrorem loremoore</Text>
                </View>
                <View style={styles.ownChatBubble}>
                    <Text>Lrorem lrorem loremoore Lrorem lrorem loremoore Lrorem lrorem loremooreLrorem lrorem loremooreLrorem lrorem loremoore</Text>
                </View>
            </View>
            <TextInput style={styles.chatInput} onChangeText={value => setInput(value)} placeholder="Message" placeholderTextColor={"white"}/>
        </View>
    )
}

export const screenOptions = navData => {
    console.log(navData.route.params.groupName)
    return {
        headerTitle: navData.route.params.groupName
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: "100%",
        backgroundColor: "#313131",
        justifyContent:"space-between",
    },

    chatBubble:{
        margin:20,
        marginBottom:0,
        borderRadius:20,
        backgroundColor:"#658cf7",
        borderWidth:1,
        width:"75%",
        padding:20,
    },

    ownChatBubble:{
        margin:20,
        marginBottom:0,
        borderRadius:20,
        backgroundColor:Values.primaryColor,
        borderWidth:1,
        width:"75%",
        padding:20,
        alignSelf:"flex-end",
    },

    chatInput:{
        borderWidth:1,
        borderRadius:20,
        borderColor:"white",
        padding:10,
        paddingLeft:20,
        margin:10,
        color:"white"
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