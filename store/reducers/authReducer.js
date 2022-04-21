import { SIGNUP, LOGIN } from "../actions/authActions";

const initialState = {
    userId: '',             // Logged in User ID   
    token: '',              // Logged in User Token   
    // isAuthenticated: false, // Is User logged in or not
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SIGNUP:
            return { userId: action.userId, token: action.token }
        case LOGIN:
            return { userId: action.userId, token: action.token }
        default:
            return state
    }

}
