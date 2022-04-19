import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input } from 'native-base';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function Input(props) {
    return (<>
        <Input
            {...props}
            style={{...styles.input,...props.style}}
            color="white"
            variant="rounded"
            width={"75%"}
            // InputLeftElement={<MaterialIcons name="account-circle" size={32} color="white" style={{ padding: 10 }} />}
            value={formState.inputValues.email}
            // onChangeText={value => inputChange("email", value)}
            onChangeText={value => dispatch({ type: "UPDATE", value: value, isValid: emailValid(value), input: "email" })}
        />
        {!formState.inputValidities.email ? <Text fontSize="sm" style={styles.error} >{props.errorText}</Text> : null}
    </>
    )
}

const styles = StyleSheet.create({
    body: {
        // fontFamily: "open-sans",
        color: "white",
        // textAlign:"center"
    }
})