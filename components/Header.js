import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Text,
    StatusBar,
    Item as FormItem,
    Input,
    Box,
    Stack,
    HStack,
    IconButton,
    Icon
} from 'native-base';

import Values from '../constants/Values';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


export default function Header(props) {

    return (
        <>
            <StatusBar style={{ width: "100%" }} bg="#3700B3" barStyle="light-content" />
            <Box style={{ width: "100%" }} safeAreaTop bg="#6200ee" />
            <HStack bg={Values.primaryColorDark} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
                <HStack alignItems="center" >
                    <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
                    <Text color="white" fontSize="20" fontWeight="bold">
                        Home
                    </Text>
                </HStack>
                <HStack>
                    <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
                </HStack>
            </HStack>
        </>
    )
}

const styles = StyleSheet.create({

})