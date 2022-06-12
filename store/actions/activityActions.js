import Activity from '../../models/activity';
import axios from 'axios';

import Values from '../../constants/Values';

export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const fetchAllActivities = () => {
    return async (dispatch, getState) => {

        const auth = getState().auth;
        const response = await axios({
            method: 'GET',
            url: `${Values.apiUrl}/api/v1/activities`,
            headers: {
                'authorization': `Bearer ${auth.token}`,
            }
        })

        // Retrieving Succesfully
        if (response.status === 200) {
            // dispatch({ type: SET_ACTIVITIES, activities: response.data })
        }
        return response
    }
}

export const fetchActivityById = (activityId) => {
    return async (dispatch, getState) => {

        const auth = getState().auth;
        const response = await axios({
            method: 'GET',
            url: `${Values.apiUrl}/api/v1/activities?id=${activityId}`,
            headers: {
                'authorization': `Bearer ${auth.token}`,
            }
        })



        // Retrieving Succesfully
        if (response.status === 200) {
            // dispatch({ type: SET_ACTIVITIES, activities: response.data })
        }
        return response
    }
}

// Fetch Owned Activities
export const fetchOwnActivities = () => {
    return async (dispatch, getState) => {

        const auth = getState().auth;
        const response = await axios({
            method: 'GET',
            url: `${Values.apiUrl}/api/v1/activities/own`,
            headers: {
                'authorization': `Bearer ${auth.token}`,
            }
        })

        // Retrieving Succesfully
        if (response.status === 200) {
            // dispatch({ type: SET_ACTIVITIES, activities: response.data })
        }
        return response
    }
}

export const createActivity = (body) => {

    return async (dispatch, getState) => {

        // console.log(body)

        const auth = getState().auth;
        const response = await axios({
            method: 'POST',
            url: `${Values.apiUrl}/api/v1/activities`,
            data: body,
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'content-type': 'application/json'
            }
        })

        console.log("Created Activity")
        console.log(response)
        // console.log(response.data)
        // Retrieving Succesfully
        if (response.status === 200 || response.status === 201 ) {
            dispatch({ type: CREATE_ACTIVITY, activityData: response.data })
        }
        return response
    }

};

export const updateActivity = (body, activityId) => {
    return async (dispatch, getState) => {

        // console.log(body)

        const auth = getState().auth;
        const response = await axios({
            method: 'PUT',
            url: `${Values.apiUrl}/api/v1/activities`,
            data: body,
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'content-type': 'application/json'
            }
        })

        if (response.status === 200 || response.status === 201) {
            dispatch({ type: UPDATE_ACTIVITY, activityId:activityId, activityData: response.data })
        }
        return response
    }
};

export const deleteActivity = activityId => {
    return { type: DELETE_ACTIVITY, pid: activityId };
};