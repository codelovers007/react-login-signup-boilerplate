import React, { Component } from 'react'
import { Image, List } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { configVariable } from '../lib/config';
import axios from 'axios'

class Chatrooms extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active_chats: []
    }
  }

  componentWillMount() {
    let user  = JSON.parse(localStorage.getItem('user'))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': configVariable.chatAuthToken
    }
    let queryData = `auth[public_key]=${configVariable.projectPublicKey}&auth[secret_key]=${configVariable.projectSecretKey}&id=${user.id}`
    axios.get(`${configVariable.apiChatUrl}/users/active_chat?${queryData}`, {headers: headers})
    .then(response => {
      if (response.status===200){
        this.setState({active_chats: response.data.data})
      }
    })
  }

  render() {
    return (
      <div>
        <h5>All Chatrooms:</h5>
        <List celled>
          {
            this.state.active_chats.map((chatroom) => {
              return (<List.Item key={chatroom.id}>
                      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                      <List.Content>
                        <List.Header>
                          <Link to={`/chatroom/${chatroom.id}`}>{chatroom.chatroom}</Link>
                        </List.Header>
                        Unread Messages <b>{chatroom.unread_message}</b>
                      </List.Content>
                    </List.Item>)
            })
          }
        </List>
      </div>
    )
  }
}

export {Chatrooms}