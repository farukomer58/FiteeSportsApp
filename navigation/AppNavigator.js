import React, { useState } from 'react';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import StartupScreen from '../screens/StartupScreen';

export default AppNavigator = () => {

    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    // Try Auto-Login First
    return (
        <NavigationContainer>
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {isAuth && <MainNavigator />}
        </NavigationContainer>
    )
}