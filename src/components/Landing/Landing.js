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
    let deets;
    let navLinks = this.state.links.map(link => {
        return (
            <Link to={`/${link}`}><div className='see-more-button'>Play now!</div></Link>
        )
    })
    if(this.state.hover === 'left'){
        deets = (
            <div className='deets left-deet'>
                <p>The Ulitmate Role playing game. 
                    Building off of ideas from the plethora of rpgs i have played myself i plan to incorperate the best 
                    pieces all together in one place where there are no limits on how far you can explore or how strong you can become.</p>
            </div>
        )
    }
    else if(this.state.hover !== 'left'){
        deets = (
            <div className='deets right-deet'>
                <p>A pixel art app that you can draw with. Long term it will be connected to the Ultimate RPG for character, monster and items sprites built by the community.</p>
            </div>
        )
    }

    console.log(this.state)

    return (

      <div className='landing-page'>
        {/*Left side of screen */}
        <div className='page-split'>
            <div className={this.state.hover === 'left' ? 'page-left hovered' : this.state.hover === 'none' ? 'page-left' : 'page-left not-hovered'} 
                onMouseEnter={() => this.mouseHover('left')} 
                onMouseLeave={() => this.mouseHover('right')}>
                

                <h1 className='title-left'>Ferret</h1>

                <img className={this.state.hover === 'left' ? 'intro-pic img-grow' : this.state.hover === 'none' ? 'intro-pic-left' : 'intro-pic img-shrink'} 
                    src='https://opengameart.org/sites/default/files/Goblin_idle.gif' 
                    alt='mon-img'/>
                {this.state.hover === 'left' &&
                    deets
                }
                    
                <h1>Ultimate RPG</h1>

                {this.state.hover !== 'left' 
                   ? <div className='see-more-button left-play' onClick={() => this.mouseHover('left')}>See More</div>
                   : <Link className='see-more-button left-play' to={`/MegaRPG`}>Play now!</Link>
                }
            </div>


            {/*Right side of screen */}
            <div className={this.state.hover === 'right' ? 'page-right hovered' : this.state.hover === 'none' ? 'page-right' : 'page-right not-hovered'}
                onMouseEnter={() => this.mouseHover('right')}
                onMouseLeave={() => this.mouseHover('right')}>
                
                <h1 className='title-right'>Playground</h1>

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

export default Games;