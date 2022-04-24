import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
    Text,
    Spacer,
    Item as FormItem,
    Flex,
    Box,
    Badge,
    HStack,
    IconButton,
    Icon
} from 'native-base';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Values from '../constants/Values';

export default function PressableCard(props) {

    return (
        <>
            <Box alignItems="center" style={{ margin: 20, width: 250 }}>
                <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => { props.navigation.navigate("ActivityDetail") }}>
                    <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >
                        <HStack alignItems="center">

                            <Image source={{
                                uri: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            }} style={styles.image} />

                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            Yoga Lab
                        </Text>
                        <Flex>
                            <HStack alignItems="center">
                                <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                    Read More
                                </Text>
                                <Spacer />

                                <Text mt="2" fontSize={10} color="coolGray.800">
                                    1 month ago
                                </Text>
                            </HStack>
                        </Flex>
                    </Box>
                </TouchableOpacity>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 125,
    },
})