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
import Dashboard from './components/custom/dashboard/Dashboard';
import Alert from './components/core/Alert';
import ServiceList from './components/custom/service/ServiceList';
import ServiceReq from './components/custom/service/ServiceReq';
import ServiceTicket from './components/custom/service/ServiceTicket';

const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path ='/' component = {Landing}/>
          <section className = 'container-b'>
            <Alert/>
            <Switch>
              <Route exact path = '/login' component = {Login}/>
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/serviceList' component={ServiceList} />
              <Route exact path='/serviceReq' component={ServiceReq} />
              <Route exact path='/serviceTicket' component={ServiceTicket} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
