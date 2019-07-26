import React from 'react';
import { Grid } from 'semantic-ui-react'
import { ChatroomForm } from './chatroom_form';
import { RecentlyChatted } from './recently_chatted';
import { Contacts } from './contacts';
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
          <Grid.Column><ChatroomForm/></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column><RecentlyChatted/></Grid.Column>
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