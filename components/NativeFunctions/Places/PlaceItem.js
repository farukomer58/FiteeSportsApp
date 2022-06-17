import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from "react-native"

export default PlaceItem = props => {
    return <Pressable onPress={props.onPress}>
        <Image source={{ uri: props.place.imageUri }} />
        <View>
            <Text>{props.place.title}</Text>
            <Text>{props.place.address}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({

});