import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './Navbar.scss'
class Navbar extends Component {

  userLogin() {
    axios.post('/api/login', {spot: this.props.place})
  }

  render() {
    let spot = this.props.place.split('/')
    console.log(spot)
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
            {this.props.userID !== null &&
              <button onClick={this.userLogin}>Login</button>
            }
        </div>
      </div>
    );
  }
}

export default Navbar;