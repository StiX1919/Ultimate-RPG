import React, { Component } from 'react';

import axios from 'axios'
import {Link} from 'react-router-dom'
import './Landing.scss'
class Games extends Component {
    constructor(){
        super()
        this.state = {
            hover: 'none',
            changed: false
        }
        this.mouseHover = this.mouseHover.bind(this)
        this.userLogin = this.userLogin.bind(this)
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

    async userLogin() {
        try {
          axios.post('/api/redirect', {place: '/UltimateRPG/CharacterSelect'})
        } 
        finally {
          window.location.href='http://localhost:3001/api/login'
    
        }
      }

  render() {
    let deets;
    if(this.state.hover === 'left'){
        deets = (
            <div className='deets left-deet'>
                <p>The Ultimate Role playing game. 
                    Building off of ideas from the plethora of rpgs i have played myself i plan to incorperate the best 
                    pieces all together in one place where there are no limits on how far you can explore or how strong you can become.</p>
            </div>
        )
    }
    else if(this.state.hover !== 'left'){
        deets = (
            <div className='deets right-deet'>
                <p>A pixel art app that you can draw with. Long term it will be connected to the Ultimate RPG for character, monster and item sprites built by the community.</p>
            </div>
        )
    }

    return (

        <div className='landing-page'>
            <h1 className={this.state.hover === 'right' ? 'title title-right' : this.state.hover === 'none' ? 'title' : 'title title-left'}>Ferret Playground</h1>
            <div className='page-split'>
                {/*Left side of screen */}
                <div className={this.state.hover === 'left' ? 'page-left hovered' : this.state.hover === 'none' ? 'page-left' : 'page-left not-hovered'}>
                    

                    <img className={this.state.hover === 'left' ? 'intro-pic img-grow' : this.state.hover === 'none' ? 'intro-pic-left' : 'intro-pic img-shrink'} 
                        src='https://opengameart.org/sites/default/files/Goblin_idle.gif' 
                        alt='mon-img'/>
                    {this.state.hover === 'left' &&
                        deets
                    }
                        
                    <h1>Ultimate RPG</h1>

                    {this.state.hover !== 'left' 
                    ? <div className='see-more-button left-play' onClick={() => this.mouseHover('left')}>See More</div>
                    : this.props.user 
                        ? <Link to={`/UltimateRPG`} className='see-more-button right-play'>Play now!</Link>
                        : <button className='see-more-button left-play' onClick={this.userLogin}>Login</button>
                    }
                </div>


                {/*Right side of screen */}
                <div className={this.state.hover === 'right' ? 'page-right hovered' : this.state.hover === 'none' ? 'page-right' : 'page-right not-hovered'}>
                    

                    <img className={this.state.hover !== 'left' ? 'intro-pic img-grow' : this.state.hover === 'none' ? 'intro-pic-right' : 'intro-pic img-shrink'} 
                        src='http://4.bp.blogspot.com/-dWmMQeiUEgk/URocXZymRCI/AAAAAAAAEUU/HUI2wJytggc/s640/ironman_pixelart2_grid.png' 
                        alt='pix-img'/>
                    {this.state.hover !== 'left' &&
                        deets
                    }

                    <h1>Pixel Art</h1>

                    {this.state.hover === 'left' 
                        ? <div className='see-more-button right-play' onClick={() => this.mouseHover('right')}>See More</div>
                        : <Link to={`/PixelArt`} className='see-more-button right-play'>Play now!</Link>
                    }
                </div>

            </div>
        
      </div>
    );
  }
}
//rethink how the layout is laid out
//Write down ideas for battle system steps to take

export default Games;