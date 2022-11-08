import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import userPersistReducer from './user/persistReducer';

const rootReducer = combineReducers({
  userReducer,
  userPersistReducer
});

export default rootReducer;
