import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {attack} from '../../../../../../../ducks/reducers/monsterReducer'

import {hurt} from '../../../../../../../ducks/reducers/heroReducer'

import './AtkInterface.css'


class AtkInterface extends Component {
  constructor(props) {
    super()
    this.state = {
        damageDone: 0,
        monDamage: 0,
        attacking: false,
        monAttacking: false
    }
    this.attack = this.attack.bind(this)
    this.showDamageDone = this.showDamageDone.bind(this)
    this.showMonDamage = this.showMonDamage.bind(this)

    this.action = this.action.bind(this)
  }
  showDamageDone(){
    this.setState({attacking: true})
    setTimeout(() => this.setState({attacking: false}), 800)
  }
  showMonDamage(){
    this.setState({monAttacking: true})
    setTimeout(() => this.setState({monAttacking: false}), 800)
  }

  action(hero, monster){
    this.attack(hero, monster)
    setTimeout(() => {
        let damage = monster.str - hero.endurance
        let newHP = hero.hero_hp - damage
        if(damage < 0){
            damage = 0
        }
        if(newHP >= hero.hero_hp){
            newHP = hero.hero_hp
        }

        let newHero = Object.assign({}, hero, {hero_hp: newHP})
        this.setState({monDamage: damage})
        this.showMonDamage()
        this.props.hurt(newHero)
    }, 500)
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

    let damage = hero.strength + bonus - monster.def
    if(damage < 0){
        damage = 0
    }
    if(crit === true){
        damage *= 2
    }
    //^^^^determining actual damage done

    let newHP = monster.hp - damage
    if(newHP >= monster.hp){
        newHP = monster.hp
    }
    //^^^Checking to make sure that damage done doesn't add to monster health.
    
    let newMon = Object.assign({}, monster, {hp: newHP})
    this.setState({damageDone: damage})
    this.showDamageDone()
    this.props.attack(newMon)
  }


  render() {


    return (
    <div className='attacks'>
        {this.state.attacking
            ? <button disabled >Attack!</button>
            : <button onClick={() => this.action(this.props.currentHero, this.props.currentMonster)}>Attack!</button>
        }

        <div className='damage-dealt'>
            <div>
                <h2>Hero damage</h2>
                {this.state.attacking ?
                    <h1>{this.state.damageDone}</h1>
                    :
                    null
                
                }
            </div>
            <div>
                <h2>Monster Damage</h2>
                {this.state.monAttacking ?
                    <h1 style={{color: 'red'}}>{this.state.monDamage}</h1>
                    :
                    null
                
                }
            </div>
        </div>
        {this.props.currentMonster.hp > 0 &&
            <Link to='/UltimateRPG/hero/Map'>
                <button>Run!</button>
            </Link>
        }
        
        
    </div>
    );
  }
}
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, {attack, hurt})(AtkInterface));