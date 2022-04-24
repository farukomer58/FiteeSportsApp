import axios from 'axios';

import Values from '../../constants/Values';

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"

const API_KEY = "AIzaSyC-l7NsOPS8BtT-NKnT3lapHmZzBj7RaJ4"

const headers = {
    "Content-Type": "application/json",
};

// SingUp / Register action function
export const signUp = (email, password) => {
    return dispatch => { //Because redux-thunk we can send two return one async one
        // const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        //     JSON.stringify({ email: email, password: password, returnSecureToken: true }),
        //     {
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     }
        // )
        // console.log(response)
        // // if (response.status ==) { throw new Error("Something went wrong!") }
        // const resDate = await response.json()
        // console.log(resDate)
        // dispatch({ type: SIGNUP, token: resDate.idToken, userId: resDate.localId })

        console.log(`${Values.apiUrl}/users`, { headers })
        axios.get(`${Values.apiUrl}/users`, { headers }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log("JOOO")
            console.log(err)
        })
    }
}

// Login action function
export const login = (email, password) => {
    return async dispatch => { //Because redux-thunk we can send two return one async one
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            JSON.stringify({ email: email, password: password, returnSecureToken: true }),
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        )

        // if (!response.ok) { throw new Error("Something went wrong!") }
        console.log(response)

        const resDate = await response.json()
        // console.log(resDate)

        dispatch({ type: LOGIN, token: resDate.idToken, userId: resDate.localId })
    }
}