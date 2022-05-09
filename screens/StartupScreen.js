import React, { useEffect } from "react"
import {
    View,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from "react-native"

export default StartupScreen = props => {
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                props.navigation.navigate("Login")
                return;
            }
            const transformedData = JSON.parse(userData)
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                // props.navigation.navigate('Auth');
                props.navigation.navigate("Login")
                // dispatch(authActions.setDidTryAL());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            // props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        }

        tryLogin();
    })

    return <View style={styles.screen}>
        <ActivityIndicator size={"large"} color="red" />
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})