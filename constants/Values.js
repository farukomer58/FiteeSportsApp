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
    // apiUrl: Platform.OS === 'android' ? 'https://bed6-145-109-147-33.eu.ngrok.io' : "http://localhost:8081/api/v1",
    apiUrl: Platform.OS === 'android' ? 'http://172.23.12.222:8080' : "http://localhost:8081/api/v1",

    numbersOfCharactersShown: 22,
}