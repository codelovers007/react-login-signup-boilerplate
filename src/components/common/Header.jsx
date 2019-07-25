import React from 'react'
import { Menu, Header, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
// import { userService } from '../../services/user.service.js';

class HeaderPage extends React.Component {
  constructor(props) {
     super(props);
     this.state = { activeItem: 'home' }
  }

  handleItemClick = (e, { name }) => {this.setState({ activeItem: name}) }

  render() {
    const { activeItem } = this.state
    return (
      <Segment clearing inverted>
        <Header as={Menu} floated='left' inverted>
          <Menu.Item><h5>PWA-CHAT</h5></Menu.Item>
        </Header>
        <Header as={Menu} floated='right' inverted >
          <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to="about" name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to="contact" name='contact' active={activeItem === 'contact'} onClick={this.handleItemClick} />
          {
            localStorage.getItem('user') 
            ? <Menu.Item as={Link} to="login"  name='logout' active={activeItem === 'login'} onClick={this.handleItemClick} />
            : <Menu.Item as={Link} to="login"  name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
          }
        </Header>
      </Segment>
    );
  }
}

export { HeaderPage };