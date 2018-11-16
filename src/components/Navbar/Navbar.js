import React, { Component } from 'react';

import axios from 'axios'

import {Link} from 'react-router-dom'
import './Navbar.scss'
class Navbar extends Component {
  constructor(){
    super()

    this.userLogin = this.userLogin.bind(this)
  }

  async userLogin() {
    try {
      axios.post('/api/redirect', {place: this.props.place})
    } 
    finally {
      window.location.href='http://localhost:3001/api/login'

    }
  }

  render() {
    let spot = this.props.place.split('/')
    if(spot[1] === 'UltimateRPG'){
      spot = 'UltimateRPG'
    } else if(spot[1] === 'PixelArt'){
      spot = 'PixelArt'
    } else spot = ''
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
            <h1>{spot}</h1>
            {this.props.user === null 
              ? <button onClick={this.userLogin}>Login</button>
              : <button>Logout</button>
            }
        </div>
      </div>
    );
  }
}

export default Navbar;