import React, { useState } from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";

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

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}