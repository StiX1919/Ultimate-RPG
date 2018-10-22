import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {attack} from '../../../../../../../ducks/reducers/monsterReducer'

import './AtkInterface.css'


class AtkInterface extends Component {
  constructor(props) {
    super()
    this.state = {
        damageDone: 0,
        attacking: false
    }
    this.attack = this.attack.bind(this)
    this.showDamageDone = this.showDamageDone.bind(this)
  }
  showDamageDone(){
    this.setState({attacking: true})
    setTimeout(() => this.setState({attacking: false}), 800)
  }

  attack(hero, monster){
    let luckFactor = hero.luck/2,
    crit = false,
    critNum = Math.floor(Math.random() * 100);

    if(critNum <= luckFactor){
        crit = true
    }
    let bonus = Math.floor((critNum / (50 - luckFactor)))
    //^^^^^^prep for luck modification to attack damage

    let damage = hero.strength + bonus - monster.defense
    if(damage < 0){
        damage = 0
    }
    if(crit === true){
        damage *= 2
    }
    //^^^^determining actual damage done

    let newHP = monster.HP - damage
    if(newHP >= monster.HP){
        newHP = monster.HP
    }
    //^^^Checking to make sure that damage done doesn't add to monster health.
    
    let newMon = Object.assign({}, monster, {HP: newHP})
    this.setState({damageDone: damage})
    this.showDamageDone()
    this.props.attack(newMon)
  }


  render() {


    return (
    <div className='attacks'>
        <button onClick={() => this.attack(this.props.currentHero, this.props.currentMonster)}>Attack!</button>


        {this.state.attacking ?
            <h1>{this.state.damageDone}</h1>
            :
            null
        
        }
    </div>
    );
  }
}
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, {attack})(AtkInterface));