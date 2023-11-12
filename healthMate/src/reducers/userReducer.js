import { combineReducers } from 'redux';

const INITIAL_STATE = {
  userDetails: {}, // You may want to use an object instead of an array
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log("in reducer",action.payload)
  console.log("in reducer",action.type)
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload // Assuming action.payload is an object
      };
      case 'UPDATE_STEP_COUNT':
      return {
        ...state,
        step_count: action.stepCount,
      };
      case 'IS_USER_LOGGED_IN':
        console.log("userr")
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      
      return state;
  }
  
};

export default userReducer;
