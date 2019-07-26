import React from 'react'
import { Image, List } from 'semantic-ui-react'

const RecentlyChatted = () => (
  <div>
    <h5>Recently Chatted:</h5>
    <List celled>
      <List.Item>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
      <List.Item>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
        <List.Content>
          <List.Header>Poodle</List.Header>
          A poodle, it's pretty basic
        </List.Content>
      </List.Item>
      <List.Item>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
        <List.Content>
          <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
      </List.Item>
    </List>
  </div>
)

export {RecentlyChatted}