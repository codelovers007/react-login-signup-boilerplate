import React, { Component } from 'react'
import { configVariable } from '../lib/config';
import axios from 'axios'

import { Form, Checkbox } from 'semantic-ui-react'

class ChatroomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      creator: {},
      name: '',
      users: [],
      members: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, data) {
    event.preventDefault();
    if (data.type === "checkbox"){
      if (data.checked) {
        this.setState({members: [...this.state.members, data.user_id]})
      } else {
        let filteredArray = this.state.members.filter(u_id => u_id !== data.user_id)
        this.setState({members: filteredArray});
      }
    }else {
      this.setState({ name: data.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {name, members} = this.state
    const data = { name: name, members: members, creator: this.state.creator.id, 
                    auth: {
                      public_key: configVariable.projectPublicKey, secret_key: configVariable.projectSecretKey
                    }
                  }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.chatAuthToken
    }
    axios.post(`${configVariable.apiChatUrl}/scrums`, data, {headers: headers})
    .then(response => {
      debugger
      
    }).catch(error=> {
      console.log("Registration error", error)
    })
  }

  componentWillMount() {
    let user  = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setState({creator: user})
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.authToken
    }
    axios.get(`${configVariable.apiUrl}/users`, {headers: headers})
    .then(response => {
      this.setState({users: response.data})
    })
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
            <Form.Button content='Create Chatroom' />
          </Form.Group>
          {
            this.state.users.map((user) => {
              return ( <Form.Group key={user.id}><Checkbox label={`${user.first_name} ${user.last_name}`} checked={this.state.members.includes(user.id)} user_id={user.id} name="checkbox" onClick={this.handleChange} /></Form.Group>)
            })
          }
        </Form>
      </div>
    )
  }
}

export {ChatroomForm}

