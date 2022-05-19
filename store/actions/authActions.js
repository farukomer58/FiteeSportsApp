import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Values from '../../constants/Values';
import qs from 'qs'

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

// Default Headers
const headers = {
    "Content-Type": "application/json",
};

// Try Auto Login
export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

// Authenticate with token saved on device
export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        // dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: LOGIN, userId: userId, token: token });
    };
};

// SingUp / Register action function
export const signUp = (inputValues, userRole) => {
    const firstName = inputValues.fullName.split(" ")[0]
    const lastName = inputValues.fullName.split(" ")[1]
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const body = { firstName: firstName, lastName: lastName ? lastName : "", email: inputValues.email, password: inputValues.password, birthDate: null, phone: inputValues.phone, userRole: userRole }

        // Register Request
        const response = await axios.post(`${Values.apiUrl}/api/v1/users/register`, body, { headers })

        if (response.status == 200) {
            const resData = await response.data;
            console.log(resData, "Registered");
            dispatch({ type: SIGNUP, token: "response.idToken", userId: "response.localId" }) // User needs to verify email first
        }
        return response
    }
}

// Login action function
export const login = (email, password) => {
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios({
            method: 'post',
            url: `${Values.apiUrl}/login`,
            data: qs.stringify({ email: email, password: password }),// Send data in x-www-form-encoded form
            headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
        })

        // Login Succesfully
        if (response.status === 200) {

            const resData = response.data;
            console.log("Logged in and got back the following info:")
            console.log(resData)

            dispatch({ type: LOGIN, token: resData.access_token, userId: resData.user_id })
            const expirationDate = new Date(
                new Date().getTime() * 1000
            );
            saveDataToStorage(resData.access_token, resData.user_id, expirationDate);
        }
        return response
    }
}

// Logout user, remove also token from local device
export const logout = () => {
    // clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

// Save token, userId, experationDate on device
const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};



let timer;
// Function for auto-logout when token expires / TODO needs further implemantation
const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};