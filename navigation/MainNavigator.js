import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens / Pages
import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/Authenticated/Home/HomeScreen';
import CalendarScreen from '../screens/Authenticated/CalendarScreen';
import ActivityDetail from '../screens/Authenticated/Activity/ActivityDetail';
import Activities, { screenOptions as activitiesScreenOptions } from '../screens/Authenticated/Activity/Activities';
import AccountOverview, { screenOptions as accountOverviewScreenOptions } from '../screens/Authenticated/Account/AccountOverview'
import ChatRoomScreen from '../screens/Authenticated/ChatRoomScreen';
import ChatScreen from '../screens/Authenticated/Chat';

import { defaultNavOptions } from './navigationConfig';
import Values from '../constants/Values';

// Account Navigation
const AccountStackNavigator = createStackNavigator();
export const AccountNavigator = () => {
    return (
        <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AccountStackNavigator.Screen
                name="Account"
                component={AccountOverview}
                options={accountOverviewScreenOptions}
            />
        </AccountStackNavigator.Navigator>
    );
};

// MainNavigation and Bottom Tab
const MainTabNavigator = createBottomTabNavigator();
export const MainNavigator = () => {
    return <>
        <MainTabNavigator.Navigator
            initialRouteName="Home"
            screenOptions={defaultNavOptions}
            barStyle={{ backgroundColor: Values.primaryColorDark }}
        //activeColor="#e91e63"
        >
            <MainTabNavigator.Screen name="Home" component={HomeScreen} options={homeScreenOptions} />
            <MainTabNavigator.Screen name="Activities" component={Activities} options={{
                tabBarLabel: 'Discover',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                ),
            }} />
            <MainTabNavigator.Screen name="ChatRoom" component={ChatRoomScreen} options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chat" color={color} size={26} />
                ),
            }} />
            <MainTabNavigator.Screen name="Calendar" component={CalendarScreen} options={{
                tabBarLabel: 'Calendar',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={26} />
                ),
            }} />
            <MainTabNavigator.Screen name="Account" component={AccountNavigator} options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }} />
        </MainTabNavigator.Navigator>
    </>
}
