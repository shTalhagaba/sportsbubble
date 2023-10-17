import {combineReducers} from 'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  user: userReducer,
  signup: signupReducer,
});

export default rootReducer;
