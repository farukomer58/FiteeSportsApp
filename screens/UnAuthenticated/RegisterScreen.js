import React, { Component, useState } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Header,
    Button,
    Text,
    Checkbox,
    Body,
    Form,
    Center,
    HStack,
    Item as FormItem,
    Input,
    Label,
    Title,
    Icon,
    Box,
    Stack,
    useToast,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { Ionicons, MaterialIcons, AntDesign, Fontisto } from '@expo/vector-icons';

export default function RegisterScreen(props) {

    const [show, setShow] = useState(false);

    const [date, setDate] = useState('09-10-2021');

    const [selectedUserType, setSelectedUserType] = useState("customer")
    const [isNextStep, setIsNextStep] = useState(false)


    const handleClick = () => setShow(!show);


    // Customer Register
    let content;

    if (selectedUserType === 'freelancer') {

        if (isNextStep) {
            content = (
                <Stack space={3} alignItems="center">
                    {
                        /* <Heading>HStack</Heading> */
                    }
                    <HStack space={3} justifyContent="center">
                        <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="green.500" rounded="md" shadow={3} _text={{
                            color: "white"
                        }}>
                            Yoga
                        </Center>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="primary.500" rounded="md" _text={{
                            color: "white"
                        }} shadow={3}>
                            Fitness
                        </Center>
                        </TouchableOpacity>
                    </HStack>

                    <HStack space={3} justifyContent="center">
                        <TouchableOpacity activeOpacity={0.8}><Center h="20" w="40" bg="secondary.500" rounded="md" shadow={3} _text={{
                            color: "white"
                        }}>
                            Calisthenics
                        </Center>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Center h="20" w="40" bg="emerald.700" rounded="md" _text={{
                                color: "white"
                            }} shadow={3}>
                                Fitness
                            </Center>
                        </TouchableOpacity>
                    </HStack>
                    <HStack space={3} justifyContent="center">
                        <TouchableOpacity activeOpacity={0.8}>
                            <Center h="20" w="40" bg="green.500" rounded="md" shadow={3} _text={{
                                color: "white"
                            }}>
                                Yoga
                            </Center>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>

                            <Center h="20" w="40" bg="primary.700" rounded="md" _text={{
                                color: "white"
                            }} shadow={3}>
                                Other
                            </Center>
                        </TouchableOpacity>


                    </HStack>


                    {/* <Checkbox value="one" my={2}>
                        <Text color={"white"}>
                            Yes, I understand and agree to the Fitee
                            Terms of Service

                        </Text>
                    </Checkbox> */}
                    <Button colorScheme="green" onPress={() => setIsNextStep(true)}>Register</Button>

                </Stack>
            )
        } else {
            content = (
                <Stack space={4} w="100%" alignItems="center">
                    <Button.Group isAttached colorScheme="green" mx={{
                        base: "auto",
                        md: 0
                    }} size="lg" borderRadius="lg">
                        <Button variant={selectedUserType === 'freelancer' ? "outline" : "solid"} onPress={() => setSelectedUserType("customer")}>Customer</Button>
                        <Button variant={selectedUserType === 'freelancer' ? "solid" : "outline"} onPress={() => setSelectedUserType("freelancer")}>Freelancer</Button>
                    </Button.Group>
                    <Input
                        type="date"
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
                        }} InputLeftElement={<Fontisto name="date" size={32} color="white" style={{ padding: 10 }} />} placeholder="Date Of Birth (MM-dd-yyyy)" />

                    <DatePicker
                        style={styles.datePickerStyle}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2010"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                // display:"none",
                                position: 'absolute',
                                left: 5,
                                top: 4,
                                marginRight: 0,
                            },
                            dateInput: {
                                borderColor: "white",
                                alignItems: "flex-start",
                                borderWidth: 1,
                                borderRadius: 20
                            },
                            placeholderText: {
                                color: "white",
                                fontSize: 17,
                                color: "gray"
                            },
                            dateText: {
                                paddingLeft: 50,
                                color: "white",
                                fontSize: 17,
                            }
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }} />
                    <Input
                        style={styles.input}
                        color="white"
                        variant="rounded"
                        w={{
                            base: "75%",
                            md: "25%"
                        }} InputLeftElement={<AntDesign name="mail" size={32} color="white" style={{ padding: 10 }} />} placeholder="Enter Email" />
                    <Input
                        style={styles.input}
                        color="white"
                        variant="rounded"
                        w={{
                            base: "75%",
                            md: "25%"
                        }} InputLeftElement={<MaterialIcons name="account-circle" size={32} color="white" style={{ padding: 10 }} />} placeholder="(+44) 999 999 999" />
                    <Input
                        style={styles.input}
                        color="white"
                        variant="rounded"
                        w={{
                            base: "75%",
                            md: "25%"
                        }} InputLeftElement={<Ionicons name="key-outline" size={32} color="white" style={{ padding: 10 }} />} placeholder="Enter Password"
                        type={show ? "text" : "password"} InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>} />

                    <Button onPress={() => setIsNextStep(true)}>Next</Button>
                    <Text color="#b3b3ff" underline style={{ textAlign: "left" }}>Already an account? Login now</Text>

                </Stack>
            )
        }

    } else {
        content = (
            <Stack space={4} w="100%" alignItems="center">
                <Button.Group isAttached colorScheme="green" mx={{
                    base: "auto",
                    md: 0
                }} size="lg" borderRadius="lg">
                    <Button variant={selectedUserType === 'freelancer' ? "outline" : "solid"} onPress={() => setSelectedUserType("customer")}>Customer</Button>
                    <Button variant={selectedUserType === 'freelancer' ? "solid" : "outline"} onPress={() => setSelectedUserType("freelancer")}>Freelancer</Button>
                </Button.Group>
                <Input
                    type="date"
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
                    }} InputLeftElement={<Fontisto name="date" size={32} color="white" style={{ padding: 10 }} />} placeholder="Date Of Birth (MM-dd-yyyy)" />

                <DatePicker
                    style={styles.datePickerStyle}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    minDate="01-01-1900"
                    maxDate="01-01-2010"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            // display:"none",
                            position: 'absolute',
                            left: 5,
                            top: 4,
                            marginRight: 0,
                        },
                        dateInput: {
                            borderColor: "white",
                            alignItems: "flex-start",
                            borderWidth: 1,
                            borderRadius: 20
                        },
                        placeholderText: {
                            color: "white",
                            fontSize: 17,
                            color: "gray"
                        },
                        dateText: {
                            paddingLeft: 50,
                            color: "white",
                            fontSize: 17,
                        }
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                    }} />
                <Input
                    style={styles.input}
                    color="white"
                    variant="rounded"
                    w={{
                        base: "75%",
                        md: "25%"
                    }} InputLeftElement={<AntDesign name="mail" size={32} color="white" style={{ padding: 10 }} />} placeholder="Enter Email" />
                <Input
                    style={styles.input}
                    color="white"
                    variant="rounded"
                    w={{
                        base: "75%",
                        md: "25%"
                    }} InputLeftElement={<MaterialIcons name="account-circle" size={32} color="white" style={{ padding: 10 }} />} placeholder="(+44) 999 999 999" />
                <Input
                    style={styles.input}
                    color="white"
                    variant="rounded"
                    w={{
                        base: "75%",
                        md: "25%"
                    }} InputLeftElement={<Ionicons name="key-outline" size={32} color="white" style={{ padding: 10 }} />} placeholder="Enter Password"
                    type={show ? "text" : "password"} InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>} />

                    {/* <Checkbox value="one" my={2} color="white">
                            Yes, I understand and agree to the Fitee
                            Terms of Service

                    </Checkbox> */}
                <Button onPress={() => console.log("hello world")}>Register</Button>
                <Text color="#b3b3ff" underline style={{ textAlign: "left" }}>Already an account? Login now</Text>

            </Stack>
        )
    }

    return (
        <ImageBackground style={styles.background} source={require("../../assets/images/loginBg.png")} resizeMode="cover">
            <View style={{ marginTop: 100 }}>
                <Box alignItems="center">
                    <Image style={styles.image} source={require("../../assets/images/logo.png")} />
                    <Text color="white" style={{ marginTop: -20, marginBottom: 10 }} fontSize="lg">{isNextStep ? "Choose Activity Type" : "Create an Account as a"}</Text>
                    {content}
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
    },

    datePickerStyle: {
        width: "75%",
    },
})