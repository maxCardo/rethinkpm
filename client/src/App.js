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
import ServiceList from './components/custom/service/ServiceList';
import ServiceDetail from './components/custom/service/ServiceDetail';
import ServiceReq from './components/custom/service/ServiceReq';
import ServiceTicket from './components/custom/service/ServiceTicket';
import Profile from './components/custom/profile/Profile'
import ChatScreen from './components/custom/Chat/ChatScreen'
import Marketplace from './components/custom/Marketplace/Marketplace'
import OffMarketList from './components/custom/OffMarket/List'
import {loadUser} from './actions/auth';
import {receiveSMS} from './actions/profile'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import settings from './settings.json'
import Alert from "./components/core/Alert";
import Dash from "./components/custom/Dash"
import TestVerticalTable from './components/custom/TestVerticalTable';
import PropertyRecords from './components/custom/PropertyRecords/PropertyRecords'
import OwnerRecords from './components/custom/PropertyRecords/OwnerRecords'
import ShowcaseRecords from './components/custom/Marketplace/showcase/showcase'


const App = ({loadUser, receiveMessage, receiveSMS, activeChat}) => {
  if(Notification.permission === 'default') {
    Notification.requestPermission();
  }
  registerServiceWorker()

  useEffect(() => {loadUser();}, [loadUser]);

  const socket = io.connect(process.env.REACT_APP_SOCKET_BACKEND ? process.env.REACT_APP_SOCKET_BACKEND : '')
  socket.on('sms', (chat) => {
    if (chat._id === activeChat.chat._id) {
      receiveSMS(chat)
    }

    //receiveMessage({chat_id, message, uuid})
    //showNotification(`New message from ${chat_id}`, message)
  })

  const routeSettings = settings.routes
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path ='/' component = {Landing}/>
        <section className ='container-b' style={{position: 'relative', overflow: 'hidden'}}>
          <Switch>
            <Route exact path = '/login' component = {Login}/>
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/services' component={ServiceList} />
            <PrivateRoute exact path='/services/:id' component={ServiceDetail} />
            <PrivateRoute exact path='/services/:id/:screen' component={ServiceDetail} />
            <PrivateRoute exact path='/chat' component={ChatScreen} />
            <Route exact path='/serviceReq' component={ServiceReq} />
            <Route exact path='/serviceTicket' component={ServiceTicket} />
            <PrivateRoute exact path='/dash' component={Dash} />
            <PrivateRoute exact path='/profile/rentPros' component={Profile} additionalProps={{ settings: routeSettings.profile.rentPros }} />
            <PrivateRoute exact path='/profile/agentPros' component={Profile} additionalProps={{settings: routeSettings.profile.agentPros }} />
            <PrivateRoute exact path='/profile/buyerPros' component={Profile} additionalProps={{ settings: routeSettings.profile.buyerPros }} />
            <PrivateRoute exact path='/profile/sellerPros' component={Profile} additionalProps={{ settings: routeSettings.profile.sellerPros }} />
            <PrivateRoute exact path='/marketplace' component={Marketplace} apiKey={routeSettings.marketplace.streetViewApiKey} />
            <PrivateRoute exact path='/offmarket' component={OffMarketList} apiKey={routeSettings.marketplace.streetViewApiKey} />
            <PrivateRoute exact path='/propertyRecords' component={PropertyRecords}/>
            <PrivateRoute exact path='/ownerRecords' component={OwnerRecords}/>
            <PrivateRoute exact path='/showcase' component={ShowcaseRecords}/>
            <Route exact path='/playground' component={Playground} />
            <Route path='/vertical-table' component={TestVerticalTable} />
          </Switch>
          <Alert  />
        </section>
      </Fragment>
    </Router>
  );
}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('/service-worker.js');
  window.serviceWorker = swRegistration
  return swRegistration;
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  activeChat: state.profile.activeChat
})

// const mapDispatchToProps = dispatch => {
//   return {
//     loadUser: loadUser().bind(this,dispatch),
//     receiveMessage:({chat_id, message, uuid}) => dispatch({type: RECEIVE_MESSAGE, payload: {chat_id, message, uuid}})
//   }
// }

export default connect(mapStateToProps, {loadUser, receiveSMS})(App)
