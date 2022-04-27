import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Values from '../../constants/Values';
import Styles from '../../constants/Styles';
import CustomText from '../native/CustomText';
import { shortenText } from '../../functions/shortenText';

export default ActivityCarouselCard = props => {
    return (
        <TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
            <View style={{ ...styles.card, ...props.style }}>
                {/* <View style={styles.cardImageContainer}> */}
                <Image
                    style={styles.cardImage}
                    source={{ uri: props.imageUrl }}
                />
                {/* </View> */}
                <View style={styles.detail}>
                    <CustomText title style={{ color: "black" }}>{shortenText(props.title,22)}</CustomText>
                    <View style={Styles.flexDirectionRowSpace}>
                        <CustomText style={{ color: "black" }}>{shortenText(props.location,22)}</CustomText>
                        <CustomText style={{ color: Values.primaryColorDark, fontSize: 10, marginTop: 10 }}>{props.rightCornerText}</CustomText>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

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
        marginLeft: 25,
        marginRight: 25,
    },
    cardImageContainer: {},
    cardImage: {
        width: "100%",
        height: 125,
        borderRadius: 10,
    },

    detail: {
        width: "100%",
    },
});
