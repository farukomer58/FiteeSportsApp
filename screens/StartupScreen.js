import React, { useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Values from '../constants/Values';

import * as authActions from '../store/actions/authActions';

// First loaded screen that checks wheter user has token on device for auto-login or not
const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            const parsedUserData = JSON.parse(userData)

            if (!parsedUserData) {
                dispatch(authActions.setDidTryAL());
                return;
            }
            // const expirationDate = new Date(expiryDate);
            if (!parsedUserData.token || !parsedUserData.userId) {
                dispatch(authActions.setDidTryAL());
                return;
            }
            // const expirationTime = expirationDate.getTime() - new Date().getTime();
            dispatch(authActions.authenticate(parsedUserData.userId, parsedUserData.token, parsedUserData.expiryDate));
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Values.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red",
    }
});

export default StartupScreen;
