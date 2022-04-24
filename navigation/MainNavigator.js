import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens / Pages
import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/Authenticated/Home/HomeScreen';
import ActivityDetailScreen, { screenOptions as activityDetailScreenOptions } from '../screens/Authenticated/Activity/ActivityDetailScreen';
import ActivitiesScreen, { screenOptions as activitiesScreenOptions } from '../screens/Authenticated/Activity/ActivitiesScreen';

import ChatRoomScreen, { screenOptions as chatRoomScreenOptions } from '../screens/Authenticated/Chat/ChatRoomScreen';
import ChatScreen from '../screens/Authenticated/Chat/ChatScreen';

import CalendarScreen, { screenOptions as calendarScreenOptions } from '../screens/Authenticated/CalendarScreen';
import AccountOverviewScreen, { screenOptions as accountOverviewScreenOptions } from '../screens/Authenticated/Account/AccountOverviewScreen'
import UserActivitiesScreen, { screenOptions as userActivitiesScreenOptions } from '../screens/Authenticated/Account/UserActivitiesScreen';
import ManageActivityScreen, { screenOptions as manageActivityScreenOptions } from '../screens/Authenticated/Account/ManageActivityScreen';

import { defaultNavOptions } from './navigationConfig';
import Values from '../constants/Values';

// Account Navigation
const AccountStackNavigator = createStackNavigator();
export const AccountNavigator = () => {
    return (
        <AccountStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AccountStackNavigator.Screen name="AccountOverviewList" component={AccountOverviewScreen} options={{ headerTitle: "Account" }} />
            <AccountStackNavigator.Screen name="UserActivities" component={UserActivitiesScreen} options={userActivitiesScreenOptions} />
            <AccountStackNavigator.Screen name="ManageActivity" component={ManageActivityScreen} options={manageActivityScreenOptions} />
        </AccountStackNavigator.Navigator>
    );
};

// Activity Navigation
const ActivityStackNavigator = createStackNavigator();
export const ActivityNavigator = () => {
    return (
        <ActivityStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ActivityStackNavigator.Screen name="ActivitiesDiscover" component={ActivitiesScreen} options={{ headerTitle: "Activities" }} />
            <ActivityStackNavigator.Screen name="ActivityDetail" component={ActivityDetailScreen} options={{ headerTitle: "ActivityDetail Title" }} />
        </ActivityStackNavigator.Navigator>
    );
};

// Chat Navigation
const ChatStackNavigator = createStackNavigator();
export const ChatNavigator = () => {
    return (
        <ChatStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ChatStackNavigator.Screen name="ChatRooms" component={ChatRoomScreen} options={{ headerTitle: "Chat" }} />
            <ChatStackNavigator.Screen name="ChatConversation" component={ChatScreen} options={{ headerShown: false }} />
        </ChatStackNavigator.Navigator>
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
            <MainTabNavigator.Screen name="Chat" component={ChatNavigator} options={chatRoomScreenOptions} />
            <MainTabNavigator.Screen name="Calendar" component={CalendarScreen} options={calendarScreenOptions} />
            <MainTabNavigator.Screen name="Account" component={AccountNavigator} options={accountOverviewScreenOptions} />
        </MainTabNavigator.Navigator>
    </>
}
