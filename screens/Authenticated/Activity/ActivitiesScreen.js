import React, { useState, useEffect } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Link,
    Label,
    Spacer,
    Heading,
    HStack,
    FlatList,
} from 'native-base';

import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import * as activityActions from '../../../store/actions/activityActions'

import axios from 'axios';

// Custom
import PressableCard from '../../../components/PressableCard';
import Card from '../../../components/Card';

import Values from '../../../constants/Values';
import CustomText from '../../../components/native/CustomText';

import ActivityListItem from '../../../components/activities/ActivityListItem';
import HorizontalLine from '../../../components/HorizontalLine';

export default ActivitiesScreen = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); // Get User Activities of redux 

    const [activityDetails, setActivityDetails] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(true)

    const renderActivityItem = (item) => {
        return <>
            <ActivityListItem
                onPress={() => { props.navigation.navigate("ActivityDetail", { activityId: item.item.id, activityTitle:item.item.title }) }}
                title={item.item.title}
                price={item.item.activityPrices[0] ? item.item.activityPrices[0].price.toFixed(2) : "..."}
                author={"Hans"}
                location={"Amsterdam"}
                tags={"Sport,fitness"}
            />
            <HorizontalLine />
        </>
    }
    // Fetch All Activities
    const fetchAllctivities = async () => {
        const result = await dispatch(activityActions.fetchAllActivities())
        setActivityDetails(result.data.content)
        setIsRefreshing(false)
    }

    useEffect(() => {
        fetchAllctivities()
    }, [])


    return (
            <View style={styles.background}>
                <HStack alignItems="center">
                    <Heading size="md" ml="-1" color="white" p={2}>
                        All Activities
                    </Heading>
                </HStack>

                {/* Search Option In Center*/}
                {/* Filter Options on the Left*/}
                {/* Possibly also sort options Right*/}

                {/* Create Pagination list  */}
                <FlatList
                    data={activityDetails}
                    renderItem={renderActivityItem}
                    keyExtractor={item => item.id}
                    refreshing={isRefreshing}
                    onRefresh={fetchAllctivities}
                />

            </View>

    )
}

export const screenOptions = navData => {
    return {
        headerShown: false,
        headerTitle: "Activities",
        title: 'Discover',
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
        // headerLeft: (props) => (
        //     <Text>Hello</Text>
        // )
    }
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    listItem: {
        // backgroundColor: "white",
        margin: 10,
    },

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#313131"
    },

    image: {
        width: 150,
        height: 100,
    },

    input: {
        color: "white",
    },

    customButton: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    }
})