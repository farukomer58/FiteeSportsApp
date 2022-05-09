import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Values from '../../constants/Values';
import qs from 'qs'

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const LOGIN_QUICK = "LOGIN_QUICK"

const API_KEY = "AIzaSyC-l7NsOPS8BtT-NKnT3lapHmZzBj7RaJ4"

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
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios.post(`${Values.apiUrl}/api/v1/users/register`,
            JSON.stringify({ firstName: inputValues.fullName, email: inputValues.email, password: inputValues.password, birthDate: null, phone: inputValues.phone, userRole: userRole }),
            { headers }
        )
        // if (response.status ==) { throw new Error("Something went wrong!") }

        // const resData = response.data;
        // console.log(resData);
        // dispatch(
        //     authenticate(
        //         resData.localId,
        //         resData.idToken,
        //         parseInt(resData.expiresIn) * 1000
        //     )
        // );
        // const expirationDate = new Date(
        //     new Date().getTime() + parseInt(resData.expiresIn) * 1000
        // );
        // saveDataToStorage(resData.idToken, resData.localId, expirationDate);

        dispatch({ type: SIGNUP, token: "response.idToken", userId: "response.localId" })
        return response
    }
}

// Login action function
export const login = (email, password) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('pasword', password);

    // console.log(params, "PARAMS")
    return async dispatch => { //Because redux-thunk we can send two return one async one
        // axios.post(`${Values.apiUrl}/login`,
        //     { email, password },
        //     {
        //         headers: {
        //             "content-Type": "application/x-www-form-urlencoded"
        //         }
        //     }
        // ).then(response => {
        //     console.log("SUCCES")
        //     console.log(response)
        //     // console.log(response.data, "From authActions.js")
        //     // dispatch(
        //     //     authenticate(
        //     //         resData.localId,
        //     //         resData.idToken,
        //     //         parseInt(resData.expiresIn) * 1000
        //     //     )
        //     // );
        //     // const expirationDate = new Date(
        //     //     new Date().getTime() + parseInt(resData.expiresIn) * 1000
        //     // );
        //     // saveDataToStorage("token", "userId", expirationDate);
        //     dispatch({ type: LOGIN, token: "response.idToken", userId: "response.localId" })
        //     return response
        // }).catch(error => {
        //     let message = 'Something went wrong!';
        //     //check for different types of error and set corespending error message
        //     throw new Error(message);
        // })

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

        console.log("dsadasdsada")
        console.log(response.data.access_token)

        dispatch({ type: LOGIN, token: "response.idToken", userId: "response.localId" })
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