import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import chat from './chat'
import dashboard from './dashboard'
import profile from './profile'
import services from './services'

export default combineReducers({alert, auth, chat, dashboard, profile, services});