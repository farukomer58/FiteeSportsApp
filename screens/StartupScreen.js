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

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            console.log("I AM TRYING TO AUTO LOGIN")
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData)
            if (!userData) {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }
         
            // const transformedData = JSON.parse(userData);
            // const { token, userId, expiryDate } = transformedData;
            // const expirationDate = new Date(expiryDate);

            // if (expirationDate <= new Date() || !token || !userId) {
            //     // props.navigation.navigate('Auth');
            //     dispatch(authActions.setDidTryAL());
            //     return;
            // }

            // const expirationTime = expirationDate.getTime() - new Date().getTime();

            // // props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userData.userId, userData.token, userData.expiryDate));
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
