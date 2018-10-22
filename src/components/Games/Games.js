import React, { Component } from 'react';

import {Link} from 'react-router-dom'

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
            <Link to={`/games/${link}`}><h4 className='nav-link'>{link}</h4></Link>
        )
    })
    return (
      <div>
        <h1>Games</h1>
        {navLinks}
      </div>
    );
  }
}

export default Games;
