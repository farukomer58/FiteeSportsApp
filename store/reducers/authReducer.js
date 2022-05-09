import { SIGNUP, LOGIN, LOGIN_QUICK,SET_DID_TRY_AL,LOGOUT } from "../actions/authActions";

const initialState = {
    userId: '',             // Logged in User ID   
    token: '',              // Logged in User Token   
    didTryAutoLogin: false, // Did try auto log in
    isAuthenticated: false, // Is User logged in or not
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return { userId: action.userId, token: action.token };
        case LOGIN:
            return { userId: action.userId, token: action.token, isAuthenticated: true };
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            };
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        case LOGIN_QUICK:
            return { ...state, isAuthenticated: true };
        default:
            return state
    }

}
