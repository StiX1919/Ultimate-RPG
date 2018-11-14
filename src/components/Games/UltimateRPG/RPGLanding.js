import React, { Component } from 'react';
import styled from 'styled-components'

import './RPGLanding.css';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { getDemoCharacter } from '../../../ducks/reducers/userReducer'
import { selectHero } from '../../../ducks/reducers/heroReducer'

import CaSeCard from './components/CharacterSelect/CaSeComps/CaSeCard/CaSeCard'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
class UltimateRPG extends Component {

  //build function that checks for user on session. Redirect to character select

  componentDidMount(){
    this.props.getDemoCharacter()
  }

  render() {

    let demoCard = (<h2>Loading Demo Hero</h2>)
    if(this.props.heroes[0]) {
        demoCard = this.props.heroes.map((hero, ind) => {
            return  <StyledLink key={ind} to={`/UltimateRPG/hero/${hero.hero_name}`} onClick={() => this.props.selectHero(hero)}>
                        <CaSeCard hero={hero} />
                    </StyledLink>
        })
    }


    return (
      <div className='rpgLanding'>
        <h1 className='RPG-title'>Ultimate RPG</h1>
        { /*this.props.userID 
          ? <Link to='/UltimateRPG/CharacterSelect'><button>Character Select</button></Link>
          : <div>
            <h2>Demo Character</h2>
            {demoCard}
          </div>
        */}
        
        </div>
      );
    }
  }
  // <button className='rpg-login-button' onClick={() => this.userLogin()} >
  //   <h3>Start/Continue your adventure!!</h3>
  //   <div className='sword-container'>
  //     <img className='left-sword login-sword' src='http://media.pyweek.org/dl/7/xkcd/sword.png' alt='left-login-sword'/>
  //     <img className='right-sword login-sword' src='http://media.pyweek.org/dl/7/xkcd/sword.png' alt='right-login-sword'/>
  //   </div>
  // </button>

const mapStateToProps = state => ({...state.userReducer, ...state.heroReducer})


export default withRouter(connect(mapStateToProps, {getDemoCharacter, selectHero})(UltimateRPG));

