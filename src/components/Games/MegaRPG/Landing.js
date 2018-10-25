import React, { Component } from 'react';
import './Landing.css';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { getDemoCharacter } from '../../../ducks/reducers/userReducer'
import { selectHero } from '../../../ducks/reducers/heroReducer'

import CaSeCard from './components/CharacterSelect/CaSeComps/CaSeCard/CaSeCard'
class MegaRPG extends Component {

  //build function that checks for user on session. Redirect to character select

  userLogin() {
    window.location.href= 'http://localhost:3001/api/login'
  }
  componentDidMount(){
    this.props.getDemoCharacter()
  }

  render() {

    let heroCards = (<h2>Loading Demo Hero</h2>)
    if(this.props.heroes[0]) {
        heroCards = this.props.heroes.map((hero, ind) => {
            return  <Link key={ind} to={`/MegaRPG/hero/${hero.hero_id}`} onClick={() => this.props.selectHero(hero)}>
                        <CaSeCard hero={hero} />
                    </Link>
        })
    }


    return (
      <div>
        <h1>MEGA RPG</h1>
        <button onClick={() => this.userLogin()} >Login</button>
        <h2>Demo Character</h2>
        {heroCards}
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer, ...state.heroReducer})


export default withRouter(connect(mapStateToProps, {getDemoCharacter, selectHero})(MegaRPG));

