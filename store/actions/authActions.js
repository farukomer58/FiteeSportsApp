import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Values from '../../constants/Values';
import qs from 'qs'

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const LOGIN_QUICK = "LOGIN_QUICK"

const headers = {
    "Content-Type": "application/json",
};

let timer;

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};
export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

// SingUp / Register action function
export const signUp = (inputValues, userRole) => {
    const lastName = inputValues.fullName.split(" ")[1]
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const body = { firstName: inputValues.fullName, lastName: lastName?lastName:"", email: inputValues.email, password: inputValues.password, birthDate: null, phone: inputValues.phone, userRole: userRole }
        console.log(body)

        const response = await axios.post(`${Values.apiUrl}/api/v1/users/register`,
            body,
            { headers }
        )
        if (response.status == 200) {
            const resData = await response.data;
            console.log(resData, "Register");
            dispatch({ type: SIGNUP, token: "response.idToken", userId: "response.localId" })
        }
        console.log(response)
        return response
    }
}

// Login action function
export const login = (email, password) => {
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios({
            method: 'post',
            url: `${Values.apiUrl}/login`,
            data: qs.stringify({
                email: email,
                password: password
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })

        // Login Succesfully
        if (response.status === 200) {

            const resData = response.data;
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

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};
const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

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

export const loginQuick = () => {
    return dispatch => {
        dispatch({ type: LOGIN_QUICK })
    }
}