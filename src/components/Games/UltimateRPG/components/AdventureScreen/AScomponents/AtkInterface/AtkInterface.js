import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {attack, setMonster} from '../../../../../../../ducks/reducers/monsterReducer'

import {hurt, addRewards} from '../../../../../../../ducks/reducers/heroReducer'

import './AtkInterface.css'
import { setTimeout } from 'timers';


class AtkInterface extends Component {
  constructor(props) {
    super()
    this.state = {
        damageDone: 0,
        monDamage: 0,
        attacking: false,
        monAttacking: false,
        heroSpeed: 0,
        monsterSpeed: 0,

        combo: 0,
        dodged: false
    }
    this.heroAttack = this.heroAttack.bind(this)
    this.monsterAttack = this.monsterAttack.bind(this)

  }
  componentDidMount(){
    this.setState({heroSpeed: this.props.currentHero.speed, monsterSpeed: this.props.currentMonster.monsterInfo.spd})
  }


  heroAttack(hero, monster){
    let luckFactor = hero.luck/2,
    crit = false,
    critNum = Math.floor(Math.random() * 100) + 1;

    if(critNum <= luckFactor){
        crit = true
    }

    let bonus = 0
    let heroLuck = hero.luck
    while(heroLuck > critNum){
        bonus += 1
        heroLuck -= 10
    }

    
    //^^^^^^prep for luck modification to attack damage
    
    let damage = hero.strength + bonus - monster.def
    if(damage < 0){
        damage = 0
    }
    if(crit === true){
        damage *= 2
    }
    //^^^^determining actual damage done
    
    console.log(heroLuck, critNum, bonus, damage)

    let newHP = monster.hp - damage
    if(newHP >= monster.hp){
        newHP = monster.hp
    }
    //^^^Checking to make sure that damage done doesn't add to monster health.
    let newMon = {...this.props.currentMonster, monsterInfo: {...this.props.currentMonster.monsterInfo, hp: newHP}}
    
    console.log(newMon.hp, 'first')
    this.setState({attacking: true, damageDone: damage, monsterSpeed: (monster.spd + this.state.monsterSpeed)}, () => {
        setTimeout(() => this.setState({attacking: false}), 500)
    })
    this.props.attack(newMon)
  }

  monsterAttack(hero, monster){
        let dodgeNum = Math.floor(Math.random()*100) + 1
        let dodged = false
        if(hero.luck > dodgeNum){
            dodged = true
        }
        let damage = monster.str - hero.endurance
        if(dodged === true){
            damage = damage - hero.speed
        }
        let newHP = hero.hero_hp - damage
        if(damage < 0){
            damage = 0
        }
        if(newHP >= hero.hero_hp){
            newHP = hero.hero_hp
        }
    
        let newHero = Object.assign({}, hero, {hero_hp: newHP})
        
        this.setState({dodged, combo: this.state.combo + 1, monAttacking: true, monDamage: damage, heroSpeed: (hero.speed + this.state.heroSpeed)}, () => {
            setTimeout(() => this.setState({
                monAttacking: false,
                dodged: false,
                combo: this.state.heroSpeed >= this.state.monsterSpeed ? 0 : this.state.combo
            }), 500)
        })
        this.props.hurt(newHero)

  }


  render() {
      console.log(this.props.currentMonster)

      let count = 0
        return (
            <div className='attacks'>
                {this.state.heroSpeed >= this.state.monsterSpeed
                    ? <button onClick={() => this.heroAttack(this.props.currentHero, this.props.currentMonster.monsterInfo)}>Attack</button>
                    : this.state.monAttacking === false && this.state.attacking === false && <button onClick={this.monsterAttack(this.props.currentHero, this.props.currentMonster.monsterInfo)}>Attacked!</button>
                }
        
                <div className='damage-dealt'>
                    <div>
                        <h2>Hero damage</h2>
                        {this.state.attacking ?
                            <h1>{this.state.damageDone}</h1>
                            :
                            null
                        
                        }
                        {this.state.dodged 
                            ? <h2>DODGED!!!</h2>
                            : null
                        }
                    </div>
                    <div>
                        <h2>Monster Damage</h2>
                        {this.state.monAttacking ?
                            <div>
                                <h1 style={{color: 'red'}}>{this.state.monDamage}</h1>
                                {this.state.combo > 1 &&
                                    <h3>{this.state.combo} hit combo!</h3>
                                }
                            </div>
                            :
                            null
                        
                        }
                    </div>
                </div>
                {this.props.currentMonster.monsterInfo.hp > 0 &&
                        <button onClick={() => {
                            this.props.openMap()
                            this.props.setMonster(null)
                        }}>Run!</button>
                }
                
                
            </div>
        );
  }
}
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, {attack, hurt, addRewards, setMonster})(AtkInterface));