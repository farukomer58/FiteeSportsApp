import { ACTIVITIES } from '../../data/dummy-data';
import {
  DELETE_ACTIVITY,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY
} from '../actions/activityActions';
import Activity from '../../models/activity';

const initialState = {
  availableActivities: ACTIVITIES,
  userActivities: ACTIVITIES.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACTIVITY:
      const newActivity = new Activity(
        new Date().toString(),
        action.activityData.ownerId,
        action.activityData.title,
        action.activityData.imageUrl,
        action.activityData.description,
        action.activityData.price
      );
      return {
        ...state,
        availableActivities: state.availableActivities.concat(newActivity),
        userActivities: state.userActivities.concat(newActivity)
      };
    case UPDATE_ACTIVITY:
      const activityIndex = state.userActivities.findIndex(
        activity => activity.id === action.pid
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
