import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Pressable,
    Text,
    Center,
    Item as FormItem,
    Input,
    Box,
    Stack,
    HStack,
    IconButton,
    Icon
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Values from '../constants/Values';

export default function Footer(props) {
    const [selected, setSelected] = React.useState(0);

    return (
        <>
            <HStack bg={Values.primaryColorDark} alignItems="center" safeAreaBottom shadow={6} style={styles.footer}>
                <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? "home" : "home-outline"} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Home
                        </Text>
                    </Center>
                </Pressable>
                <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Search
                        </Text>
                    </Center>
                </Pressable>
                <Pressable opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? "cart" : "cart-outline"} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Cart
                        </Text>
                    </Center>
                </Pressable>
                <Pressable opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
                    <Center>
                        <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? "account" : "account-outline"} />} color="white" size="sm" />
                        <Text color="white" fontSize="12">
                            Account
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        // flex: 1,
        justifyContent: 'flex-end',
    },
})