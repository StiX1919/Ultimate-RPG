import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './Navbar.scss'
class Navbar extends Component {

  render() {
    return (

      <div className='navbar'>
        <div className='navContents'>
            <div className='rotate-square'>
                <div className='square-top'>
                    <div className='top-1'/>
                    <div className='top-2'/>
                </div>
                <div className='square-front-left'>
                    <div className='left-1'/>
                    <div className='left-2'/>
                </div>
            </div>
            <h1>Ferret's Playgound</h1>
        </div>
      </div>
    );
  }
}

export default Navbar;