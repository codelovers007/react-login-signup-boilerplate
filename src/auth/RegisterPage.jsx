import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
// import { userService } from '../services/user.service.js';
import { configVariable } from '../lib/config';
import axios from 'axios'
import { toast } from 'react-toastify';
toast.configure()

class RegisterPage extends React.Component{
	constructor(props) {
    super(props);

    // userService.logout();

    this.state = { 
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirmation: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }


  handleSubmit(e) {
    e.preventDefault();
    const {first_name, last_name, email, password, password_confirmation} = this.state
    const data = {user: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.authToken
    }
    axios.post(`${configVariable.apiUrl}/users`, JSON.stringify(data), {headers: headers})
    .then(response => {
      if(response.statusText==="Created"){
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success("Successfully Register")
        this.props.history.push({ pathname: "/login" });
      }
    }).catch(error=> {
      console.log("Registration error", error)
    })
  }

  render(){
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
		    <Grid.Column style={{ maxWidth: 450 }}>
		      <Header as='h2' color='teal' textAlign='center'>
		        Register Form
		      </Header>
		      <Form size='large' onSubmit={this.handleSubmit}>
		        <Segment stacked>
		          <Form.Input fluid placeholder='First Name' name='first_name' onChange={this.handleChange}/>
		          <Form.Input fluid placeholder='Last Name' name='last_name' onChange={this.handleChange}/>
		          <Form.Input fluid placeholder='E-mail address' name='email' onChange={this.handleChange}/>
		          <Form.Input fluid placeholder='Password' type='password' name='password' onChange={this.handleChange}/>
		          <Form.Input fluid placeholder='Confirm Password' type='password' name='password_confirmation' onChange={this.handleChange}/>

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

export {RegisterPage};
