import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './store';

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
import Profile from './components/custom/profile/investor/Profile'
import CrmDashboard from './components/custom/CrmDashboard'
import ChatScreen from './components/custom/Chat/ChatScreen'



const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path ='/' component = {Landing}/>
          <section className = 'container-b' style={{position: 'relative'}}>
            <Alert/>
            <Switch>
              <Route exact path = '/login' component = {Login}/>
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/serviceList' component={ServiceList} />
              <Route exact path='/crm' component={CrmDashboard} />
              <Route exact path='/chat' component={ChatScreen} />
              <Route exact path='/serviceReq' component={ServiceReq} />
              <Route exact path='/serviceTicket' component={ServiceTicket} />
              <Route exact path='/addProfile' component={AddProfile} />
              <Route exact path='/addProperty' component={AddProperty} />
              <Route exact path='/profile' component={Profile}/>
              <Route exact path='/playground' component={Playground} />
            </Switch>
            
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
