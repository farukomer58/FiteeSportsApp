import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens / Pages
import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/Authenticated/Home/HomeScreen';
import ActivityDetail, { screenOptions as activityDetailScreenOptions } from '../screens/Authenticated/Activity/ActivityDetail';
import ActivitiesScreen, { screenOptions as activitiesScreenOptions } from '../screens/Authenticated/Activity/ActivitiesScreen';
import ChatRoomScreen, { screenOptions as chatRoomScreenOptions } from '../screens/Authenticated/ChatRoomScreen';
import CalendarScreen, { screenOptions as calendarScreenOptions } from '../screens/Authenticated/CalendarScreen';
import AccountOverviewScreen, { screenOptions as accountOverviewScreenOptions } from '../screens/Authenticated/Account/AccountOverviewScreen'
import ChatScreen from '../screens/Authenticated/Chat';

import { defaultNavOptions } from './navigationConfig';
import Values from '../constants/Values';

// Account Navigation
const AccountStackNavigator = createStackNavigator();
export const AccountNavigator = () => {
    return (
        <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AccountStackNavigator.Screen name="AccountOverviewList" component={MainNavigator} options={{ headerTitle: "Account" }} />
        </AccountStackNavigator.Navigator>
    );
};

// Activity Navigation
const ActivityStackNavigator = createStackNavigator();
export const ActivityNavigator = () => {
    return (
        <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AccountStackNavigator.Screen name="ActivitiesDiscover" component={ActivitiesScreen} options={{ headerTitle: "Activities" }} />
            <AccountStackNavigator.Screen name="ActivityDetail" component={ActivityDetail} options={{ headerTitle: "ActivityDetail Title" }} />
        </AccountStackNavigator.Navigator>
    );

    
};

// createMaterialBottomTabNavigator or createBottomTabNavigator
// MainNavigation and Bottom Tab
const MainTabNavigator = createBottomTabNavigator();
export const MainNavigator = () => {
    return <>
        <MainTabNavigator.Navigator
            initialRouteName="HomeNav"
            screenOptions={defaultNavOptions}
            shifting={false}
        // barStyle={{ backgroundColor: Values.primaryColorDark }}
        //activeColor="#e91e63"
        >
            <MainTabNavigator.Screen name="Home" component={HomeScreen} options={homeScreenOptions} />
            <MainTabNavigator.Screen name="Activities" component={ActivityNavigator} options={activitiesScreenOptions} />
            <MainTabNavigator.Screen name="ChatRoom" component={ChatRoomScreen} options={chatRoomScreenOptions} />
            <MainTabNavigator.Screen name="Calendar" component={CalendarScreen} options={calendarScreenOptions} />
            <MainTabNavigator.Screen name="Account" component={AccountNavigator} options={accountOverviewScreenOptions} />
        </MainTabNavigator.Navigator>
    </>
}
