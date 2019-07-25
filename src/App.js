import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import {Layout} from './components/common/Layout';
import {PrivateRoute} from './components/PrivateRoute';
import {LoginPage} from './auth/LoginPage';
import {RegisterPage} from './auth/RegisterPage';
import {HomePage} from './home';
import {AboutPage} from './about';
import {ContactPage} from './contact';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
          <Route path="/login"component={LoginPage} />
          <Route path="/register" component={RegisterPage}/>
        </Layout>
      </div>
    );
  }
}
