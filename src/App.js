import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import {LoginPage} from './auth/LoginPage';
import {RegisterPage} from './auth/RegisterPage';
import {HomePage} from './home';
import {AboutPage} from './about';
import {ContactPage} from './contact';
// import {Header} from './header';

function App() {
  return (
    <div className="App">
      <Router>
        <PrivateRoute exact path="/" render={() => <Layout><HomePage/></Layout>}/>
        <Route path="/about" render={() => <Layout><AboutPage/></Layout>}/>
        <Route path="/contact" render={() => <Layout><ContactPage/></Layout>}/>
        <Route path="/login" render={() => <Layout><LoginPage/></Layout>}/>
        <Route path="/register" render={() => <Layout><RegisterPage/></Layout>}/>
      </Router>
    </div>
  );
}

export default App;