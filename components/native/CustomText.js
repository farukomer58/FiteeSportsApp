import React from 'react'
import { StyleSheet } from 'react-native'
import {Text} from 'native-base';

export default function CustomText(props) {
  return (
    <Text {...props} style={{ ...styles.body, ...props.style }} >{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  body: {
      fontFamily: "nunito-regular",
      color:"white",
  }
})