import { ACTIVITIES } from '../../data/dummy-data';
import {
  SET_ACTIVITIES,
  DELETE_ACTIVITY,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY
} from '../actions/activityActions';
import Activity from '../../models/activity';

const initialState = {
  availableActivities: [],
  userActivities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        availableActivities: action.activities,
        userActivities: action.activities
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        userActivities: state.userActivities.concat(action.activityData)
      };
    case UPDATE_ACTIVITY:
      const activityIndex = state.userActivities.findIndex(
        activity => activity.id === action.activityId
      );
      const updatedActivity = new Activity(
        action.pid,
        state.userActivities[productIndex].ownerId,
        action.activityData.title,
        action.activityData.imageUrl,
        action.activityData.description,
        state.userActivities[activityIndex].price
      );
      const updatedUserActivities = [...state.userActivities];
      updatedUserActivities[productIndex] = updatedActivity;
      const availableActivityIndex = state.availableActivities.findIndex(
        activity => activity.id === action.pid
      );
      const updatedAvailableActivities = [...state.availableActivities];
      updatedAvailableActivities[availableActivityIndex] = updatedActivity;
      return {
        ...state,
        availableActivities: updatedAvailableActivities,
        userActivities: updatedUserActivities
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        userActivities: state.userActivities.filter(
          activity => activity.id !== action.pid
        ),
        availableActivities: state.availableActivities.filter(
          activity => activity.id !== action.pid
        )
      };
  }
  return state;
};
