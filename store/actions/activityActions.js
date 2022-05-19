import Activity from '../../models/activity';
import axios from 'axios';

import Values from '../../constants/Values';

export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const fetchActivities = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

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
            dispatch({ type: SET_ACTIVITIES, activities: response.data })
        }
        return response
    }
}

export const createActivity = (body) => {

    return async (dispatch, getState) => {

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

        console.log(response)
        // console.log(response.data)
        // Retrieving Succesfully
        if (response.status === 200) {
            // dispatch({
            //     type: CREATE_ACTIVITY,
            //     activityData: {
            //         title,
            //         description,
            //         imageUrl,
            //         price
            //     }
            // })
        }
        return response
    }

};

export const updateActivity = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_ACTIVITY,
        pid: id,
        activityData: {
            title,
            description,
            imageUrl,
        }
    };
};

export const deleteActivity = activityId => {
    return { type: DELETE_ACTIVITY, pid: activityId };
};