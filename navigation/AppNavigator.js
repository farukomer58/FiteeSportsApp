import React, { useState } from 'react';
import { Platform } from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

// Screens / Pages
import LoginScreen from '../screens/UnAuthenticated/LoginScreen'
import RegisterScreen from '../screens/UnAuthenticated/RegisterScreen';
import ForgetPasswordScreen from '../screens/UnAuthenticated/ForgetPasswordScreen';

import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/Authenticated/HomeScreen';
import CalendarScreen from '../screens/Authenticated/CalendarScreen';
import ActivityDetail from '../screens/Authenticated/ActivityDetail';
import Activities from '../screens/Authenticated/Activities';

import AccountOverview from '../screens/Authenticated/Account/AccountOverview'

// Constants
import Values from '../constants/Values'
import ChatRoomScreen from '../screens/Authenticated/ChatRoomScreen';
import ChatScreen from '../screens/Authenticated/Chat';

import { useSelector } from 'react-redux';

// DEFAULT navigation options
const defaultOptions = {
    headerShown: false,
    headerStyle: {
        display: "none",
        backgroundColor: Platform.OS === 'android' ? Values.primaryColor : "white"
    },
    headerTitleStyle: {
        fontFamily: "nunito-regular",
        color: "black"
    },
    headerTintColor: Platform.OS === 'android' ? "white" : Values.primaryColor,
}

// Navigation and Bottom Tab
const BottomTab = () => {

    // const isAuth = useSelector(state => !!state.auth.token)
    const Tab = createMaterialBottomTabNavigator();

    return <>
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{ backgroundColor: Values.primaryColorDark }}
            labeled={true}
            screenOptions={defaultOptions}
        // activeColor="#e91e63"
        >
            <Tab.Screen name="Home" component={HomeScreen} options={homeScreenOptions} />
            <Tab.Screen name="Activities" component={Activities} options={{
                tabBarLabel: 'Discover',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="ChatRoom" component={ChatRoomScreen} options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chat" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                tabBarLabel: 'Calendar',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="Account" component={AccountOverview} options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }} />

        </Tab.Navigator>
    </>
}

const Stack = createNativeStackNavigator();
export default AppNavigator = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    return (
        <NavigationContainer>

            {isAuthenticated ? (
                <Stack.Navigator initialRouteName='HomeTab' screenOptions={defaultOptions}>
                    <Stack.Screen name="HomeTab" component={BottomTab} />
                    <Stack.Screen name="Activities" component={Activities} />
                    <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName='Login' screenOptions={defaultOptions}>
                    <Stack.Screen name="Login" component={LoginScreen}  />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    )
}





// createStackNavigator({
//     Categories: {
//         screen: CategoriesScreen,
//         // navigationOptions: options
//     },
//     CategoryMeals: CategoryMealsScreen,
//     MealDetail: MealDetailScreen,
// }, {
//     // initialRouteName:"Categoies", Inital Screen, takes first by default
//     mode: "modal", //has efect on IOS
//     defaultNavigationOptions: options
// })


// export default createAppContainer(MealsNavigator)
