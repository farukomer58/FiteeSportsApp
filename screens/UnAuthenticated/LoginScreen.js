import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Header,
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
    Stack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen(props) {

    const [show, setShow] = React.useState(false);

    const handleClick = () => setShow(!show);

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            <View style={{ marginTop: 200 }}>
                <Box alignItems="center">
                    <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                    <Text color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">Login to your Account</Text>
                    <Stack space={4} w="100%" alignItems="center">
                        <Input
                            style={styles.input}
                            color="white"
                            variant="rounded"
                            w={{
                                base: "75%",
                                md: "25%"
                            }} InputLeftElement={<MaterialIcons name="account-circle" size={32} color="white" style={{ padding: 10 }} />} placeholder="Name" />
                        <Input
                            style={styles.input}
                            color="white"
                            variant="rounded"
                            w={{
                                base: "75%",
                                md: "25%"
                            }} InputLeftElement={<Ionicons name="key-outline" size={32} color="white" style={{ padding: 10 }} />} placeholder="Password"
                            type={show ? "text" : "password"} InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>} />

                        <Text color="#b3b3ff" underline style={{ textAlign: "left" }}>Forget Password?</Text>

                        <Button colorScheme="green" style={styles.customButton} onPress={() => props.navigation.navigate('Home')}>Login</Button>

                        <Text color="#b3b3ff" italic underline style={{}}>No account yet? Sign Up Now</Text>

                        <Button style={{ width: "30%" }} onPress={() => props.navigation.navigate('Register')}>Register</Button>


                    </Stack>

                </Box>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: "center",
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