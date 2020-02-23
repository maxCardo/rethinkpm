import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//Components
import PrivateRoute from './components/core/routing/PrivateRoute';
import Navbar from './components/core/Navbar';
import Landing from './components/custom/Landing';
import Login from './components/core/Login';
import Register from './components/core/Register';
import Playground from './components/core/Playground';
import Dashboard from './components/custom/dashboard/Dashboard';
import Alert from './components/core/Alert';
import ServiceList from './components/custom/service/ServiceList';
import ServiceReq from './components/custom/service/ServiceReq';
import ServiceTicket from './components/custom/service/ServiceTicket';
import AddProfile from './components/custom/profile/AddProfile';
import AddProperty from './components/custom/assets/AddProperty';
import Profile from './components/custom/profile'
import CrmDashboard from './components/custom/CrmDashboard'
import ChatScreen from './components/custom/Chat/ChatScreen'
import {loadUser} from './actions/auth';
import { connect } from 'react-redux';
import {RECEIVE_MESSAGE} from './actions/type'
import io from 'socket.io-client';



const App = ({loadUser, receiveMessage}) => {
  useEffect(() => {loadUser();}, [loadUser]);
  const socket = io.connect(process.env.REACT_APP_SOCKET_BACKEND ? process.env.REACT_APP_SOCKET_BACKEND : '')
  socket.on('sms', ({chat_id, message, uuid}) => {
    receiveMessage({chat_id, message, uuid})
  } )
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path ='/' component = {Landing}/>
        <section className ='container-b' style={{position: 'relative'}}>
          <Alert/>
          <Switch>
            <Route exact path = '/login' component = {Login}/>
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/serviceList' component={ServiceList} />
            <PrivateRoute exact path='/crm' component={CrmDashboard} />
            <PrivateRoute exact path='/chat' component={ChatScreen} />
            <Route exact path='/serviceReq' component={ServiceReq} />
            <Route exact path='/serviceTicket' component={ServiceTicket} />
            <Route exact path='/addProfile' component={AddProfile} />
            <Route exact path='/addProperty' component={AddProperty} />
            <PrivateRoute exact path='/profile/:id' component={Profile}/>
            <Route exact path='/playground' component={Playground} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}




const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => {
  return {
    loadUser,
    receiveMessage:({chat_id, message, uuid}) => dispatch({type: RECEIVE_MESSAGE, payload: {chat_id, message, uuid}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
