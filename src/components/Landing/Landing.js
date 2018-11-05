import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './Landing.scss'
class Games extends Component {
    constructor(){
        super()
        this.state = {
            links: ['MegaRPG', 'PixelArt'],
            hover: 'none',
            changed: false
        }
        this.mouseHover = this.mouseHover.bind(this)
    }
    
    mouseHover(side){
        if(this.state.changed === false){
            this.setState({hover: side, changed: true}, () => {
                setTimeout(() => {
                    this.setState({changed: false})
                }, 500)
            })
        }
    }

  render() {
    let navLinks = this.state.links.map(link => {
        return (
            <Link to={`/${link}`}><h4 className='nav-link'>{link}</h4></Link>
        )
    })

    console.log(this.state)

    return (

      <div className='landing-page'>
        <div className='page-split'>
            <div className={this.state.hover === 'left' ? 'page-left hovered' : this.state.hover === 'none' ? 'page-left' : 'page-left not-hovered'} 
                onMouseEnter={() => this.mouseHover('left')} 
                onMouseLeave={() => this.mouseHover('right')}>

                <h1 className='title-left'>Ferret</h1>

            </div>
            <div className={this.state.hover === 'right' ? 'page-right hovered' : this.state.hover === 'none' ? 'page-right' : 'page-right not-hovered'}
                onMouseEnter={() => this.mouseHover('right')}
                onMouseLeave={() => this.mouseHover('right')}>
                
                <h1 className='title-right'>Playground</h1>
            </div>
        </div>
        
      </div>
    );
  }
}

export default Games;