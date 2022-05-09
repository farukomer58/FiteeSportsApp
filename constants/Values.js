import {Platform} from 'react-native'

export default {
    // Font Constants
    fontPrimary: "balsamiq-regular",
    fontPrimaryBold: "balsamiq-bold",

    // Color Constants
    primaryColor: "#b2de0d",
    primaryColorDark: "#739108",
    secondaryColor: "#ae2",

    successColor:"#82DD55",
    warningColor:"#EDB95E",
    errorColor:"#E23636",
    focusColor: "#7FFFD4",

    textColor: "#fff",
    textColorBlack:"1F292E",

    // Server Config
    apiUrl: Platform.OS === 'android' ? ' https://1424-86-89-50-62.eu.ngrok.io' : "http://localhost:8081/api/v1",

    numbersOfCharactersShown:22,
}