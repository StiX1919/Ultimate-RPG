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
//try to start styling tomorrow

  render() {
    let navLinks = this.state.links.map(link => {
        return (
            <Link to={`/${link}`}><h4 className='nav-link'>{link}</h4></Link>
        )
    })

    console.log(this.state)

    return (

      <div className='landing-page'>
        {navLinks}
      </div>
    );
  }
}

export default Games;