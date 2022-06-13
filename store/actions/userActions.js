import axios from 'axios';

import Values from '../../constants/Values';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateUser = (userId, userBody) => {
    return async (dispatch, getState) => {

        const auth = getState().auth;
        const response = await axios({
            method: 'PUT',
            data: { ...userBody },
            url: `${Values.apiUrl}/api/v1/users/${userId}`,
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
