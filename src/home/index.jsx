import React from 'react';
import { Grid, Button } from 'semantic-ui-react'
import { ChatroomForm } from './chatroom_form';
import { Contacts } from './contacts';
import { Link } from "react-router-dom";
import { Archives } from './archives';

class HomePage extends React.Component{
  render(){
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column><h1>Logged In as: {user.first_name} {user.last_name}</h1></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}><ChatroomForm/></Grid.Column>
          <Grid.Column width={6}>
            <Button as={Link} to={`/users/${user.id}/chatrooms`} content="See All Chatrooms" primary/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><Contacts/></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><Archives/></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export {HomePage};