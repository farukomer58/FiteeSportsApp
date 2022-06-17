import { Platform } from 'react-native'

export default {
    // Font Constants
    fontPrimary: "balsamiq-regular",
    fontPrimaryBold: "balsamiq-bold",

    // Color Constants
    primaryColor: "#b2de0d",
    primaryColorDark: "#739108",
    secondaryColor: "#ae2",

    successColor: "#82DD55",
    warningColor: "#EDB95E",
    errorColor: "#E23636",
    focusColor: "#7FFFD4",

    textColor: "#fff",
    textColorBlack: "1F292E",

    // Server Config
    
    apiUrl: "https://fitee-backend-maven.herokuapp.com",
    // apiUrl: Platform.OS === 'android' ? 'https://c20f-86-89-50-62.eu.ngrok.io' : "http://localhost:8080/api/v1",
    // apiUrl: Platform.OS === 'android' ? 'http://172.23.12.235:8080' : "http://localhost:8081/api/v1",

    numbersOfCharactersShown: 22,
}