import React from 'react';
import './common.css';
import { Segment } from 'semantic-ui-react'
import {HeaderPage} from './Header';

class Layout extends React.Component{
  render(){
    return(
      <section className="page">
        <HeaderPage/>
        <Segment secondary>
          {this.props.children}
        </Segment>
      </section>
    );
  }
}

export {Layout};