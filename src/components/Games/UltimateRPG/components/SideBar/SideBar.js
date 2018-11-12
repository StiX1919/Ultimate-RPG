import React, { Component } from 'react';

import axios from 'axios'

import {Link} from 'react-router-dom'
import './SideBar.css'
class SideBar extends Component {
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
    return (
      <div className='sidebar'>
        
      </div>
    );
  }
}

export default SideBar;