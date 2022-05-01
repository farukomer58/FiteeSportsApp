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
    apiUrl: Platform.OS === 'android' ? 'https://164f-2a02-a454-fca1-1-5ec-d0d9-1932-4e8e.eu.ngrok.io/api/v1' : "http://localhost:8081/api/v1",

    numbersOfCharactersShown:22,
}