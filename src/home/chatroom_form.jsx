import React, { Component } from 'react'
import { configVariable } from '../lib/config';
import axios from 'axios'
import { Form, Checkbox, Dropdown } from 'semantic-ui-react'
import { toast } from 'react-toastify';
toast.configure()

class ChatroomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      creator: {},
      name: '',
      users: [],
      members: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event, data) {
    this.setState({ name: data.value })
  }

  handleUserChange(event, data) {
    this.setState({members: data.value})
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
      if (response.status===200){
        this.setState({members: [], name: ''})
        toast.success("Successfully created")
      }
    }).catch(error=> {
      console.log("scrum creation error", error)
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
    axios.get(`${configVariable.apiUrl}/users?user[access_token]=${user.access_token}`, {headers: headers})
    .then(response => {
      this.setState({users: response.data})
    })
  }

  render() {
    const options = []
    this.state.users.map((user) => {
      options.push({key: user.id, text: `${user.first_name} ${user.last_name} ( ${user.email} )`, value: user.id})
    })
    const { name } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleInputChange} />
            <Form.Button content='Create Chatroom' />
          </Form.Group>
            <Dropdown 
              name="contacts_dropdown"
              fluid 
              multiple 
              search  
              selection     
              options={ options } 
              onChange={ this.handleUserChange }     
            />
        </Form>
      </div>
    )
  }
}

export {ChatroomForm}

