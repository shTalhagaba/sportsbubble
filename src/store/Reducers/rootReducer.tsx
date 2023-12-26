import {combineReducers} from 'redux';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import dmaCodeReducer from './dmaCodeReducer';
import featureFlagReducer from './featureFlagReducer';

const rootReducer = combineReducers({
  user: userReducer,
  signup: signupReducer,
  dma: dmaCodeReducer,
  feature: featureFlagReducer,
});

export default rootReducer;
