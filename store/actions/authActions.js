import axios from 'axios';

import Values from '../../constants/Values';

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const LOGIN_QUICK = "LOGIN_QUICK"

const API_KEY = "AIzaSyC-l7NsOPS8BtT-NKnT3lapHmZzBj7RaJ4"

const headers = {
    "Content-Type": "application/json",
};

// SingUp / Register action function
export const signUp = (fullName, email, password) => {
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios.post(`${Values.apiUrl}/users/register`,
            JSON.stringify({ firstName: fullName, email: email, password: password, returnSecureToken: true }),
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
        // if (response.status ==) { throw new Error("Something went wrong!") }
        dispatch({ type: SIGNUP, token: "response.idToken", userId: "response.localId" })
        return response
        // console.log(`${Values.apiUrl}/users`, { headers })
        // axios.get(`${Values.apiUrl}/users`, { headers }).then((response) => {
        //     console.log(response)
        // }).catch((err) => {
        //     console.log("JOOO")
        //     console.log(err)
        // })
    }
}

// Login action function
export const login = (email, password) => {
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios.post(`${Values.apiUrl}/users/login`,
            // const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            JSON.stringify({ email: email, password: password }),
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
        // if (!response.ok) { throw new Error("Something went wrong!") }
        // console.log(response)
        dispatch({ type: LOGIN, token: "response.idToken", userId: "response.localId" })
        return response
    }
}

export const loginQuick = () => {
    return dispatch => {
        dispatch({ type: LOGIN_QUICK })
    }
}