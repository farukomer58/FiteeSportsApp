import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native';

export default function CustomText(props) {


  return (
    <Text {...props} style={props.title ? { ...styles.titleText, ...props.style } : { ...styles.text, ...props.style }}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({

  titleText: {
    fontFamily: "nunito-regular",
    color: "white",
    fontSize: 18,
  },
  text: {
    fontFamily: "nunito-regular",
    color: "white",
  }
})