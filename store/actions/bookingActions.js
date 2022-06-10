import axios from 'axios';

import Values from '../../constants/Values';


export const makeBooking = (body) => {
    return async (dispatch, getState) => {

        const auth = getState().auth;
        const response = await axios({
            method: 'POST',
            url: `${Values.apiUrl}/api/v1/bookings`,
            data: { ...body },
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
