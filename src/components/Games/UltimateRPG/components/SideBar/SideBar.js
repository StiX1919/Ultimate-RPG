import React, { Component } from 'react';
import {connect} from 'react-redux'

import axios from 'axios'

import {Link, withRouter} from 'react-router-dom'
import './SideBar.css'
class SideBar extends Component {
  constructor(){
    super()
    this.state = {
        sidebar: null
    }

    this.changeBar = this.changeBar.bind(this)

  }

  changeBar(){
      if(this.state.sidebar === null){
          this.setState({sidebar: true})
      } else
      this.setState({sidebar: !this.state.sidebar})
  }


  render() {
    let hero = this.props.heroReducer.currentHero
    let sidebar = this.state.sidebar

    return (
      <div className={sidebar ? 'sidebar open' : 'sidebar close'}>
        <div className='side-button' onClick={this.changeBar}>
            <h3 className={sidebar ? 'side-open' : sidebar === null ? '' : 'side-close'}>{'>'}</h3>
        </div>
        {sidebar &&
            <div className='sidebar-links'>
                <Link to='/UltimateRPG/CharacterSelect'><h2>Hero Selection</h2></Link>
                <Link to={`/UltimateRPG/hero/${hero.hero_name}`}><h2>Hero info</h2></Link>
                <Link to='/UltimateRPG/hero/Map' onClick={this.changeBar}><h2>Adventure Map</h2></Link>
            </div>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({heroReducer: state.heroReducer})

export default withRouter(connect(mapStateToProps, {})(SideBar));