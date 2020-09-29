import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import chat from './chat'
import dashboard from './dashboard'
import services from './services'
import brokerDashboard from "./brokerDashboard";
import profile from "./profile";
import marketplace from "./marketplace";


export default combineReducers({alert, auth, chat, dashboard, services, brokerDashboard,profile,marketplace});