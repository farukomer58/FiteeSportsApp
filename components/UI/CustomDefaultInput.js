import React, { useReducer, useEffect, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from 'native-base';
import Values from '../../constants/Values';

import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import CustomText from '../native/CustomText';

const UPDATE_INPUT = "UPDATE_INPUT"
const INPUT_FOCUS = "INPUT_FOCUS"
// const INPUT_BLUR = "INPUT_BLUR"
const inputReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_INPUT:
            return { ...state, value: action.value, isValid: action.isValid }
        case INPUT_FOCUS:
            return { ...state, focus: action.focus }
        // case INPUT_BLUR:
        //     return { ...state, touched: true, focus: false }
        default:
            return state
    }
}

export default function CustomDefaultInput(props) {

    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.intialValidity ? props.intialValidity : false,
        focus: false,
    })
    const [isTouched, setIsTouched] = useState(false) // Check validity after input is pressed once
    // const [inputSplitWidth, setInputSplitWidth] = useState("")
    let inputSplitWidth=0

    const [errorMessage, setErrorMessage] = useState(props.errorText)

    // Check Validity on every key strok and dispatch to reducer to update input values
    const inputChangeHandler = value => {
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // const otherRegex = /"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z";

        let isValid = true;

        if (props.required && value.trim().length === 0) { isValid = false }
        if (props.email && !regexEmail.test(value.trim())) { isValid = false }
        if (props.min != null && +value < props.min) { isValid = false }
        if (props.max != null && +value > props.max) { isValid = false }
        if (props.minLength != null && value.length < props.minLength) {
            isValid = false
            // setErrorMessage(props.errorText2 ? props.errorText2 : props.errorText) 
        }

        dispatchInput({ type: UPDATE_INPUT, value: value, isValid: isValid })

        if (isTouched) {
            props.onInputChange(value, isValid) // send input values back to overal Form
        }
    }

    const handleInputBlur = () => {
        dispatchInput({ type: INPUT_FOCUS, focus: false })
    }
    const handleInputFocus = () => {
        setIsTouched(true)
        dispatchInput({ type: INPUT_FOCUS, focus: true })
    }

    // Enable different configuration and styles for input, select correct style switching on props
    const getInputStyle = () => {
        switch (props.variant) {
            case "rounded":
                return styles.inputRounded
            case "filled":
                return styles.inputFilled
            case "split":
                const splitByWidth = 100 / props.splitBy
                console.log(splitByWidth)
                inputSplitWidth = splitByWidth
                return { width: `${splitByWidth}%` }

            default:
                
            // return styles.input
        }
    };

    return (
        <View>
            <View style={inputState.focus ? { ...styles.inputContainer, ...getInputStyle(), ...props.style, ...styles.inputFocus } : { ...styles.inputContainer, ...getInputStyle(), ...props.style }}>
                {props.leftElement && props.leftElement}
                <TextInput
                    {...props}
                    style={inputSplitWidth ? { ...styles.input, width: `${100}%` } : styles.input}
                    placeholderTextColor="#C6C6C6"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    value={inputState.value}
                    onChangeText={inputChangeHandler}
                />
                {props.rightElement && props.rightElement}
            </View>
            {!inputState.isValid && isTouched ? <CustomText fontSize="sm" style={styles.error} >{errorMessage}</CustomText> : null}
        </View>

    )
}

const styles = StyleSheet.create({
    body: {
        // fontFamily: "open-sans",
        color: "white",
        // textAlign:"center"
    },

    inputContainer: {
        flexDirection: "row",
        // backgroundColor:"red",
        marginBottom: 5,
    },

    input: {
        width: "100%",
        // color: "#fff",
        // padding: 15,
        // backgroundColor:"blue",
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    inputRounded: {
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 50,
        width: 300,
        padding: 15,
        color: "red"
    },
    inputFilled: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 50,
        width: 300,
        padding: 15,
        color: "#fff"
    },

    inputFocus: {
        borderColor: Values.focusColor
    },

    // Styles for Error text under input
    error: {
        color: Values.errorColor,
        fontSize: 14,
        marginTop: -8,
        // marginBottom: 5,
        marginLeft: 15,
    },
})