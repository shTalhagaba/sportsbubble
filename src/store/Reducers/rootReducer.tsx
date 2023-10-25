import {combineReducers} from 'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import dmaCodeReducer from './dmaCodeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  signup: signupReducer,
  dma: dmaCodeReducer,
});

export default rootReducer;
