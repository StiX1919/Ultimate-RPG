import React, { Component } from 'react';

import './RPGLanding.css';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { getDemoCharacter } from '../../../ducks/reducers/userReducer'
import { selectHero } from '../../../ducks/reducers/heroReducer'

class UltimateRPG extends Component {

  //build function that checks for user on session. Redirect to character select

  render() {


    return (
        <div className='rpgLanding'>
          <h1 className='RPG-title'>Ultimate RPG</h1>
          <Link to='/'><h4>Back to Games</h4></Link>
        </div>
      );
    }
  }

const mapStateToProps = state => ({...state.userReducer, ...state.heroReducer})


export default withRouter(connect(mapStateToProps, {getDemoCharacter, selectHero})(UltimateRPG));

