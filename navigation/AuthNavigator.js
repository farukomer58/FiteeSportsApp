import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Screens / Pages
import LoginScreen, { screenOptions as loginScreenOptions } from '../screens/UnAuthenticated/LoginScreen'
import RegisterScreen, { screenOptions as registerScreenOptions } from '../screens/UnAuthenticated/RegisterScreen';
import ForgetPasswordScreen, { screenOptions as forgetPasswordScreenOptions } from '../screens/UnAuthenticated/ForgetPasswordScreen';

import { defaultNavOptions } from './navigationConfig';

// Navigation for UnAuthorized Users
const AuthStackNavigator = createStackNavigator()
export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={loginScreenOptions} />
            <AuthStackNavigator.Screen name="Register" component={RegisterScreen} options={registerScreenOptions} />
            <AuthStackNavigator.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={forgetPasswordScreenOptions} />
        </AuthStackNavigator.Navigator>
    );
};