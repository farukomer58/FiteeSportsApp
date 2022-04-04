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

export default function DatesCard(props) {

    return (
        <>
            <Box alignItems="center" style={{ margin: 20, width: 250 }}>
                <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={()=>{props.navigation.navigate("ActivityDetail")}}>
                    <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8" >
                        
                        <Text color="coolGray.800" fontWeight="medium" fontSize="lg">
                            Tuesday 15 March 2022
                        </Text>
                        <Text mt="2" fontSize={10} color="coolGray.800">
                                    1 hour regular session
                                </Text>
                        <Flex>
                            <HStack alignItems="center">
                                <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                    Read More
                                </Text>
                                <Spacer />

                              
                            </HStack>
                        </Flex>
                    </Box>
                </TouchableOpacity>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:125,
    },
})