import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import chat from './chat'

export default combineReducers({alert, auth, chat});