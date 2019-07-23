import React from 'react';
import './App.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/common/Layout';
import {LoginPage} from './auth/LoginPage';
import {RegisterPage} from './auth/RegisterPage';
import {HomePage} from './home';
import {AboutPage} from './about';
import {ContactPage} from './contact';
// import {Header} from './header';

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;