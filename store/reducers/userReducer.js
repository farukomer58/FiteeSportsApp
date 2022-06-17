import {
  UPDATE_PROFILE
} from '../actions/userActions';

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return state;
  }
  return state;
};
