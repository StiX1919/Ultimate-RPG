import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import './Landing.scss'
class Games extends Component {
    constructor(){
        super()
        this.state = {
            links: ['MegaRPG', 'PixelArt'],
            pics: ['https://www.deltaco.com/images/food/menu/thumbs/tacos/thumb_tacos.jpg', 'https://vignette.wikia.nocookie.net/spongebob/images/f/f2/Mermaidman2.jpg/revision/latest?cb=20090413005857', 'https://www.helenkaminski.eu/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/b/i/bilbao_fedora_1146_1_2.jpg'],
            current: 0
        }
    }
    componentDidMount(){
        setTimeout(() => {
            if(this.state.current < this.state.pics.length - 1){
                this.setState({current: this.state.current + 1})
            } else this.setState({current: 0})
        }, 1000)
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
        <h1>Games</h1>
        {navLinks}
        <img className='testPic' src={this.state.pics[this.state.current]} alt='pic'/>
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