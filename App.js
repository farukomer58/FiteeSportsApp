import React, { useState } from "react";
import {
  Text,
  Box,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { View, StyleSheet } from 'react-native'

import LoginScreen from "./screens/UnAuthenticated/LoginScreen";
import RegisterScreen from "./screens/UnAuthenticated/RegisterScreen";
import HomeScreen from "./screens/Authenticated/HomeScreen";

import { LogBox } from 'react-native';

import AppNavigator from './navigation/AppNavigator'

LogBox.ignoreLogs(['NativeBase:']);

// Define the config
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {

  const [currentPage, setCurrentPage] = useState("login")

  const changePage = (page) => {
    setCurrentPage(page)
  }

  let content;
  if (currentPage === 'register') {
    content = <RegisterScreen onChangePage={changePage} />
  } else if (currentPage === 'login') {
    content = <LoginScreen onChangePage={changePage} />
  } else if (currentPage === 'home') {
    content = <HomeScreen onChangePage={changePage} />
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems:"center",
    justifyContent: "center"
  },



})
