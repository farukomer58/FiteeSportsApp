import React, { useState, useCallback, useRef } from 'react';
import {
    Item as FormItem,
    HStack,
} from 'native-base';

import { View, Image, StyleSheet, ImageBackground, ScrollView, Text, SafeAreaView } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Carousel from 'react-native-snap-carousel';

import PressableCard from '../../../components/PressableCard';
// import Card from '../../../components/Card';

import Values from '../../../constants/Values';
import Styles from '../../../constants/Styles';
import CustomText from '../../../components/native/CustomText';

import LinkText from '../../../components/native/LinkText';
import ActivityCarousel from '../../../components/UI/ActivityCarousel';
import Card from '../../../components/UI/Card'
import { TouchableOpacity } from 'react-native-gesture-handler';

import ActivityCarouselCard from '../../../components/activities/ActivityCarouselCard';
import { RECENT_ACTIVITIES } from '../../../data/dummy-data';

export default function HomeScreen(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(RECENT_ACTIVITIES);
    const ref = useRef(null);

    const renderRecentActivitiesCarousel = useCallback(({ item, index }) => (
        <ActivityCarouselCard
            onPress={() => console.log("Go to Activity with title", item.title)}
            imageUrl={item.imageUrl}
            title={item.title}
            location={item.description}
        />
    ), []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]}>

            <View style={styles.background}>


                <View style={Styles.flexDirectionRowSpace}>
                    <CustomText title style={{ ...Styles.paddingText, fontSize: 20 }}>
                        Recent Activities
                    </CustomText>
                    <LinkText onPress={() => { props.navigation.navigate('Activities') }} style={{ paddingTop: 20, paddingRight: 10, }}>View All</LinkText>
                </View>

                {/* <ActivityCarousel /> */}

                <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Carousel
                            layout="default"
                            ref={ref}
                            data={RECENT_ACTIVITIES}
                            sliderWidth={250}
                            itemWidth={275}
                            renderItem={renderRecentActivitiesCarousel}
                            onSnapToItem={(index) => setActiveIndex(index)}
                        />
                    </View>
                </SafeAreaView>

                <ScrollView horizontal={true} height={280} >
                    {/* style={{ backgroundColor: 'blue' }} */}
                    <HStack>
                        {["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"].map(val => (
                            <PressableCard key={val} navigation={props.navigation} />
                        )
                        )}
                    </HStack>
                </ScrollView>


            </View>
        </ScrollView>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "Home",
        title: 'Home',
        // tabBarBadge: 3,
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        // headerLeft: (props) => (
        //     <Text>Hello</Text>
        // ),
        // headerRight: (props) => (
        //     <Text>Hello</Text>
        // )
    }
}

const styles = StyleSheet.create({

    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        width: 250,
        height: 200,
    },
    cardImageContainer: {},
    cardImage: {
        width: "100%",
        height: 125,
        borderRadius: 10,
    },


    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#313131"
    },

    image: {
        width: 175,
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