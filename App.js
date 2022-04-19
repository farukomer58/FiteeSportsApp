import React, { useState } from "react";
import {
  LogBox
} from 'react-native';

// Native Base Imports
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";

// App Navigator
import AppNavigator from './navigation/AppNavigator'

// Imports for font loading
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'

// React Redux / State Management
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import mainContext from "./store/reducers/mainContext";

// Config Redux with reducers
const rootReducer = combineReducers({
  main: mainContext
});
const store = createStore(rootReducer);

// TEMP: Removes Warnings
LogBox.ignoreLogs(['NativeBase:']);

// Define the config Native Base
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({ colors: newColorTheme });

// LOAD FONTS
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {

  // If font not loaded load show/return AppLoading screen
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) { return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} onError={console.warn} /> }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>

  );
}