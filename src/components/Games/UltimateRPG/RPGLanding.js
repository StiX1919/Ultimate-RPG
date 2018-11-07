import React, { Component } from 'react';
import './RPGLanding.css';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { getDemoCharacter } from '../../../ducks/reducers/userReducer'
import { selectHero } from '../../../ducks/reducers/heroReducer'

import CaSeCard from './components/CharacterSelect/CaSeComps/CaSeCard/CaSeCard'
class UltimateRPG extends Component {

  //build function that checks for user on session. Redirect to character select

  userLogin() {
    window.location.href= 'http://localhost:3001/api/login'
  }
  componentDidMount(){
    this.props.getDemoCharacter()
  }

  render() {

    let demoCard = (<h2>Loading Demo Hero</h2>)
    if(this.props.heroes[0]) {
        demoCard = this.props.heroes.map((hero, ind) => {
            return  <Link key={ind} to={`/UltimateRPG/hero/${hero.hero_id}`} onClick={() => this.props.selectHero(hero)}>
                        <CaSeCard hero={hero} />
                    </Link>
        })
    }


    return (
      <div className='rpgLanding'>
        <h1 className='RPG-title'>Ultimate RPG</h1>
        <button className='rpg-login-button' onClick={() => this.userLogin()} >
          <h3>Start/Continue your adventure!!</h3>
          <div className='sword-container'>
            <img className='left-sword login-sword' src='http://media.pyweek.org/dl/7/xkcd/sword.png' alt='left-login-sword'/>
            <img className='right-sword login-sword' src='http://media.pyweek.org/dl/7/xkcd/sword.png' alt='right-login-sword'/>
          </div>
        </button>
        <h2>Demo Character</h2>
        {demoCard}
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer, ...state.heroReducer})


export default withRouter(connect(mapStateToProps, {getDemoCharacter, selectHero})(UltimateRPG));

