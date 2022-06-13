import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Alert,
} from 'react-native';

import { Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../../store/actions/userActions';

// Custom
import CustomText from '../../../components/native/CustomText';

export default ProfileSettingsScreen = props => {
    const dispatch = useDispatch();

    const user = props.route.params ? props.route.params.user : null;

    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [birthDate, setBirthDate] = useState(user ? user.birthDate : '');

    const updateProfile = async () => {
        const userBody = {
            firstName:firstName,
            lastName:lastName
        }
        const response = await dispatch(userActions.updateUser(user.id,userBody))
        if (response.status) {
            Alert.alert("User Updated")
        }
    }

    return (
        <ScrollView style={styles.background}>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <CustomText style={styles.label}>firstName</CustomText>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        color="white"
                        onChangeText={text => setFirstName(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <CustomText style={styles.label}>LastName</CustomText>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        color="white"
                        onChangeText={text => setLastName(text)}
                    />
                </View>
                {/* <View style={styles.formControl}>
                    <CustomText style={styles.label}>BirthDate</CustomText>
                    <TextInput
                        style={styles.input}
                        value={birthDate}
                        color="white"
                        onChangeText={text => setBirthDate(text)}
                    />
                </View> */}

                <Button colorScheme="green" style={styles.customButton} onPress={updateProfile} key={1}>Update Profile</Button>

            </View>
        </ScrollView>
    );
};

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: 'Profile Settings'
    };
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        backgroundColor: "#313131"
    },

    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'nunito-regular-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    customButton: {
        // width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

});
