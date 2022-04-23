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

// Pages
import LoginScreen from '../screens/UnAuthenticated/LoginScreen'
import RegisterScreen from '../screens/UnAuthenticated/RegisterScreen';
import ForgetPasswordScreen from '../screens/UnAuthenticated/ForgetPasswordScreen';

import HomeScreen from '../screens/Authenticated/HomeScreen';
import CalendarScreen from '../screens/Authenticated/CalendarScreen';
import ActivityDetail from '../screens/Authenticated/ActivityDetail';
import Activities from '../screens/Authenticated/Activities';

// Constants
import Values from '../constants/Values'
import ChatRoomScreen from '../screens/Authenticated/ChatRoomScreen';
import ChatScreen from '../screens/Authenticated/Chat';

// DEFAULT navigation options
const options = {
    headerShown: false,
    headerStyle: {
        display: "none"
        // backgroundColor: Platform.OS === 'android' ? Values.primaryColor : "white"
    },
    // headerTintColor: Platform.OS === 'android' ? "white" : Values.primaryColor,
}

const Stack = createNativeStackNavigator();

// Navigation and Bottom Tab
const BottomTab = () => {

    const Tab = createMaterialBottomTabNavigator();

    return <>
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{ backgroundColor: Values.primaryColor }}
        // activeColor="#e91e63"
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
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
            <Tab.Screen name="Account" component={CalendarScreen} options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }} />
             <Tab.Screen name="Activities" component={Activities} options={{
                tabBarLabel: 'Activities',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cart" color={color} size={26} />
                ),
            }} />
        </Tab.Navigator>
    </>
}

export default AppNavigator = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <Stack.Navigator initialRouteName='HomeTab' screenOptions={options}>
                    <Stack.Screen name="HomeTab" component={BottomTab} options={{ headerShown: false }} />
                    <Stack.Screen name="Activities" component={Activities} />
                    <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName='Login' screenOptions={options}>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Overview' }} />
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
