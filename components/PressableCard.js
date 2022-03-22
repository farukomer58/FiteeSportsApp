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
            <Box  alignItems="center" style={{margin:20, width:250}}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Box   borderWidth="1" borderColor="coolGray.300" shadow="3" bg={"coolGray.100"} p="5" rounded="8">
                        <HStack alignItems="center">
                            <Badge colorScheme="darkBlue" >
                                <Text>Business</Text>
                            </Badge>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                                1 month ago
                            </Text>
                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            Marketing License
                        </Text>
                        <Text mt="2" fontSize="sm" color="coolGray.700">
                            Unlock powerfull time-saving tools for creating email delivery
                            and collecting marketing data
                        </Text>
                        <Flex>
                            <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                Read More
                            </Text>
                        </Flex>
                    </Box>
                </TouchableOpacity>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({

})