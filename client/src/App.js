import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

//Components:
import Navbar from './components/core/Navbar';
import Landing from './components/custom/Landing';
import Login from './components/core/Login';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path ='/' component = {Landing}/>
        <section className = 'container'>
          <Switch>
            <Route exact path = '/login' component = {Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
