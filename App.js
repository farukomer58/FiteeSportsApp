import React, { useState } from "react";
import {
  LogBox,
  AppRegistry
} from 'react-native';

// (Native Base) React Native Paper Imports 
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";

// import {
//   Provider as PaperProvider,
//   Text
// } from 'react-native-paper';

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
import authReducer from "./store/reducers/authReducer";
import activityReducer from './store/reducers/activityReducer';
import userReducer from './store/reducers/userReducer'

// Config Redux with reducers
const rootReducer = combineReducers({
  main: mainContext,
  auth: authReducer,
  activities: activityReducer,
  user: userReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); // ReduxThunk:Enable to send request in redux actions

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
    "nunito-regular-bold": require("./assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "nunito-regular": require("./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf"),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
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