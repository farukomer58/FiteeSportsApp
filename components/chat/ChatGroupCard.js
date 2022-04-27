import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Card from '../UI/Card';
import CustomText from '../native/CustomText';
import Values from '../../constants/Values';
import Styles from '../../constants/Styles';
import { shortenText } from '../../functions/shortenText';

export default ChatGroupCard = props => {

    let TouchableCmp = TouchableOpacity;
    // if (Platform.OS === 'android' && Platform.Version >= 21) {
    //     TouchableCmp = TouchableNativeFeedback;
    // }
    return (
        <TouchableCmp onPress={props.onPress} activeOpacity={0.8} >
            <Card style={styles.cartItem}>
                <View style={styles.itemData}>
                    <Image style={styles.image} source={{ uri: props.groupImage }} />
                    <View style={styles.chatGroupContainer}>
                        <View style={Styles.flexDirectionRowSpace}>
                            <CustomText style={styles.chatGroupName}>{shortenText(props.groupName, 22)} </CustomText>
                            <CustomText style={styles.timeText}>{props.groupLastMessageTime}</CustomText>
                        </View>
                        <CustomText style={styles.recentText}>{shortenText(props.groupLastMessage, 75)}</CustomText>
                    </View>
                </View>
            </Card>
        </TouchableCmp>
    );
};

const styles = StyleSheet.create({

    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        height: 100,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatGroupContainer: {
        marginTop: -15,
        marginLeft: 5,
        // backgroundColor:"yellow",
        width: "78%"
    },
    chatGroupName: {
        // width:"100%",
        fontFamily: 'nunito-regular-bold',
        color: '#888',
        fontSize: 16
    },
    recentText: {
        fontFamily: 'nunito-regular',
        color: '#888',
        fontSize: 12
    },
    timeText: {
        fontFamily: 'nunito-regular-bold',
        color: '#888',
        fontSize: 12
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 100
    },
});

