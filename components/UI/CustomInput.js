import React, { useReducer, useEffect, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from 'native-base';
import Values from '../../constants/Values';

import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';


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

export default function CustomInput(props) {

    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.intialValidity ? props.intialValidity : false,
        focus: false,
    })
    const [isTouched, setIsTouched] = useState(false) // Check validity after input is pressed once

    // Check Validity on every key strok and dispatch to reducer to update input values
    const inputChangeHandler = value => {
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let isValid = true;

        if (props.required && value.trim().length === 0) { isValid = false }
        if (props.email && !regexEmail.test(value.toLowerCase())) { isValid = false }
        if (props.min != null && +value < props.min) { isValid = false }
        if (props.max != null && +value > props.max) { isValid = false }
        if (props.minLength != null && value.length < props.minLength) { isValid = false }

        dispatchInput({ type: UPDATE_INPUT, value: value, isValid: isValid })

        if (isTouched) {
            props.onInputChange(inputState.value, inputState.isValid) // send input values back to overal Form
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
                    style={styles.input}
                    placeholderTextColor="#fff"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    value={inputState.value}
                    onChangeText={inputChangeHandler}
                />
                {props.rightElement && props.rightElement}
            </View>
            {!inputState.isValid && isTouched ? <Text fontSize="sm" style={styles.error} >{props.errorText}</Text> : null}
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
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 50,
        width: 300,
        marginBottom: 20,
    },

    input: {
        width: 210,
        color: "#fff",
        padding: 15,
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
        borderWidth: 2,
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
        color: "#ff0000",
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 15,
    },
})