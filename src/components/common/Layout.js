import React from 'react';
import './common.css';
import {HeaderPage} from './Header';

class Layout extends React.Component{
  render(){
    return(
      <section className="page">
        <HeaderPage/>
        <section>
          {this.props.children}
        </section>
      </section>
    );
  }
}

export {Layout};