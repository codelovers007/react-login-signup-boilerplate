import React, { Component } from 'react'
import { Button, Comment, Form, Image, List, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { encrypt, decrypt } from '../lib/CustomEncDnc'
import { configVariable } from '../lib/config';
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { toast } from 'react-toastify';
toast.configure()

const ActionCable = require('actioncable')

class Chatroom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      chatroom_id: props.match.params.chatroomId,
      chatroom_name: '',
      message: '',
      members: '',
      currentUser: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    let user  = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setState({currentUser: user})
      this.createSocket(user);
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.chatAuthToken
    }
    let queryData = `auth[public_key]=${configVariable.projectPublicKey}&auth[secret_key]=${configVariable.projectSecretKey}&id=${this.state.chatroom_id}`
    axios.get(`${configVariable.apiChatUrl}/messages?${queryData}`, {headers: headers})
    .then(response => {
      if (response.status===200){
        this.setState({messages: response.data.data.messages, message: response.data.message, chatroom_name: response.data.data.chatroom_name})
      }
    })
  }

  handleChange(event){
    console.log(event)
  }

  handleSubmit(event){
    let text = event.target[0].value
    if (text !== '' && text !== undefined){
     let data = { body: event.target[0].value, chatroom_id: this.state.chatroom_id, user_id: this.state.currentUser.id}
     this.chats.speak(data);
     event.target[0].value = ''
    } else {
      toast.error("Please enter valid text")
    }
  }

  createSocket(user) {
    let cable = ActionCable.createConsumer(`${configVariable.actionCableUrl}?uid=${user.id}&uname=${user.first_name} ${user.last_name}&public_key=${configVariable.projectPublicKey}`)
    this.chats = cable.subscriptions.create({
      channel: 'ChatroomChannel'
    }, {
      connected: () => {},
      received: (data) => {
        Object.assign(data.message, {body: decrypt(data.message.body, data.chatroom_name)})
        this.setState({messages: this.state.messages.concat(data.message)})
        console.log(data);
      },
      speak: function(chatContent) {
        return this.perform('speak', {
          content: chatContent
        });
      }
    });
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="messenger" id={this.state.chatroom_id}>
        <h4>Welcome to Chatroom:  {this.state.chatroom_name}</h4>
        <Segment>
          {this.state.message === "not chatted yet" ? <h5>{this.state.message}</h5>
          :
            <Comment.Group>
             { this.state.messages.map((message) => {
                return (
                  <Comment key={message.id}>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                    <Comment.Content>
                      <Comment.Author as='a'>{'Steve Jobes'}</Comment.Author>
                      <Comment.Metadata>
                        <div>{moment(message.created_at).fromNow()}</div>
                      </Comment.Metadata>
                      <Comment.Text>{message.body}</Comment.Text>
                    </Comment.Content>
                  </Comment>)
              })
            }
            </Comment.Group>
          }
          <Segment>
            <Form reply  onSubmit={this.handleSubmit} className="new_message">
              <Form.TextArea name="body" onChange={this.handleChange} placeholder='Enter your message...'/>
              <Button content='Send Message' labelPosition='left' icon='facebook messenger' primary />
            </Form>
          </Segment>
        </Segment>
      </div>
    )
  }
}

export {Chatroom}