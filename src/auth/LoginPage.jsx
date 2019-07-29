import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { userService } from '../services/user.service.js';
import { configVariable } from '../lib/config';
import axios from 'axios'
import { toast } from 'react-toastify';
toast.configure()

class LoginPage extends React.Component{
	  constructor(props) {
      super(props);

      userService.logout();
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)

      this.state = {
          email: '',
          password: '',
          submitted: false,
          loading: false,
          error: ''
      };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state
    const data = {user: {
      email: email,
      password: password
    }}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.authToken
    }
    axios.post(`${configVariable.apiUrl}/users/login`, JSON.stringify(data), {headers: headers})
    .then(response => {
      if(response.statusText==="Created"){
        let token = {access_token: response.headers.accesstoken}
        const user = Object.assign(response.data, token)
        localStorage.setItem('user', JSON.stringify(user));
      	toast.success("Successfully Login")
        this.props.history.push({ pathname: "/" });
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
		        Log-in to your account
		      </Header>
		      <Form size='large' onSubmit={this.handleLoginSubmit}>
		        <Segment stacked>
		        	<Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' onChange={this.handleChange}/>
		        	<Form.Input fluid icon='lock' iconPosition='left' type='password' placeholder='Password' name='password' onChange={this.handleChange}/>
		          <Button color='teal' fluid size='large'>
		            Login
		          </Button>
		        </Segment>
		      </Form>
		      <Message>
		        New to us? <Link to='register'>Sign Up</Link>
		      </Message>
		    </Grid.Column>
		  </Grid>
    );
  }
}

export {LoginPage}
