import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

//Components
import PrivateRoute from './components/core/routing/PrivateRoute';
import Navbar from './components/core/Navbar';
import Landing from './components/custom/Landing';
import Login from './components/core/Login';
import Register from './components/core/Register';
import Dashboard from './components/custom/dashboard';
import Alert from './components/core/Alert';

const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path ='/' component = {Landing}/>
          <section className = 'container'>
            <Alert/>
            <Switch>
              <Route exact path = '/login' component = {Login}/>
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
