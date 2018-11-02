import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './Landing.scss'
class Games extends Component {
    constructor(){
        super()
        this.state = {
            links: ['MegaRPG', 'PixelArt']
        }
    }

  render() {
    let navLinks = this.state.links.map(link => {
        return (
            <Link to={`/${link}`}><h4 className='nav-link'>{link}</h4></Link>
        )
    })
    return (
      <div className='landing-page'>
        <h1>Games</h1>
        {navLinks}
        {/* animation idea*/}
        <div className='rotate-square'>
            <div className='square-top'>
                <div className='top-1'/>
                <div className='top-2'/>
            </div>
            <div className='square-front-left'>
                <div className='left-1'/>
                <div className='left-2'/>
            </div>
            <div className='square-front-right'/>
        </div>
      </div>
    );
  }
}

export default Games;