import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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