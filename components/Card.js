import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
    Text,
    Heading,
    Item as FormItem,
    Flex,
    Box,
    Badge,
    AspectRatio,
    HStack,
    Stack,
    Center
} from 'native-base';

import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Values from '../constants/Values';

export default function Card(props) {

    return (
        <>
            <Box alignItems="center">
                <TouchableOpacity activeOpacity={0.8}>
                    <Box alignItems="center">
                        <Box  rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                    }} alt="image" />
                                </AspectRatio>
                                {/* <Center bg="violet.500" _dark={{
                                    bg: "violet.400"
                                }} _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs"
                                }} position="absolute" bottom="0" px="3" py="1.5">
                                    PHOTOS
                                </Center> */}
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        Yoga Amsterdam
                                    </Heading>
                                    {/* <Text fontSize="xs" _light={{
                                        color: "violet.500"
                                    }} _dark={{
                                        color: "violet.400"
                                    }} fontWeight="500" ml="-0.5" mt="-1">
                                        The Silicon Valley of India.
                                    </Text> */}
                                </Stack>
                                <Text fontWeight="400">
                                   Join Yoga in Amsterdam now, relaxing, meditating
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    {/* <HStack alignItems="center">
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} fontWeight="400">
                                            6 mins ago
                                        </Text>
                                    </HStack> */}
                                </HStack>
                            </Stack>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({

})