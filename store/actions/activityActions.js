import Activity from '../../models/activity';

export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';

export const createActivity = (title, description, imageUrl, price) => {
    return {
        type: CREATE_ACTIVITY,
        activityData: {
            title,
            description,
            imageUrl,
            price
        }
    };
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