import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import {Layout} from './components/common/Layout';
import {PrivateRoute} from './components/PrivateRoute';
import {LoginPage} from './auth/LoginPage';
import {RegisterPage} from './auth/RegisterPage';
import { Container } from 'semantic-ui-react'
import {HomePage} from './home';
import {AboutPage} from './about';
import {ContactPage} from './contact';
import {Chatrooms} from './chatrooms/index.jsx';
import {Chatroom} from './chatrooms/chatroom.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <Layout>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
          <Route path="/login"component={LoginPage} />
          <Route path="/register" component={RegisterPage}/>
          <Route path="/chatroom/:chatroomId" component={Chatroom} />
          <Route path="/users/:userId/chatrooms" component={Chatrooms} />
        </Layout>
      </Container>
    );
  }
}
