import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router';

class RegisterPage extends React.Component{
  render(){
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
		    <Grid.Column style={{ maxWidth: 450 }}>
		      <Header as='h2' color='teal' textAlign='center'>
		        Register Form
		      </Header>
		      <Form size='large'>
		        <Segment stacked>
		          <Form.Input fluid placeholder='User Name' />
		          <Form.Input fluid placeholder='First Name' />
		          <Form.Input fluid placeholder='Last Name' />
		          <Form.Input fluid placeholder='E-mail address' />
		          <Form.Input fluid placeholder='Password' type='password' />
		          <Form.Input fluid placeholder='Confirm Password' type='password' />

		          <Button color='teal' fluid size='large'>
		            Sign Up
		          </Button>
		        </Segment>
		      </Form>
		      <Message>
		        Already Registered? <Link to='login'>Login Here</Link>
		      </Message>
		    </Grid.Column>
		  </Grid>
    );
  }
}

export {RegisterPage}
