import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {attack} from '../../../../../../../ducks/reducers/monsterReducer'

import {hurt, addRewards} from '../../../../../../../ducks/reducers/heroReducer'

import './AtkInterface.css'


class AtkInterface extends Component {
  constructor(props) {
    super()
    this.state = {
        damageDone: 0,
        monDamage: 0,
        attacking: false,
        monAttacking: false,
        heroSpeed: 0,
        monsterSpeed: 0
    }
    this.heroAttack = this.heroAttack.bind(this)
    this.monsterAttack = this.monsterAttack.bind(this)

    this.showDamageDone = this.showDamageDone.bind(this)
    this.showMonDamage = this.showMonDamage.bind(this)

    this.action = this.action.bind(this)
  }
  componentDidMount(){
    this.setState({heroSpeed: this.props.currentHero.speed, monsterSpeed: this.props.currentMonster.spd})
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
        this.heroAttack(hero, monster)
    
        setTimeout(() => {
            if(monster.hp - this.state.damageDone > 0){
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
            }
        }, 500)
    
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
    let newMon = Object.assign({}, monster, {hp: newHP})
    
    console.log(newMon.hp, 'first')
    this.setState({damageDone: damage, monsterSpeed: (monster.spd + this.state.monsterSpeed)})
    this.showDamageDone()
    this.props.attack(newMon)
  }

  monsterAttack(hero, monster){
    let damage = monster.str - hero.endurance
    let newHP = hero.hero_hp - damage
    if(damage < 0){
        damage = 0
    }
    if(newHP >= hero.hero_hp){
        newHP = hero.hero_hp
    }

    let newHero = Object.assign({}, hero, {hero_hp: newHP})
    
    this.setState({monDamage: damage, heroSpeed: (hero.speed + this.state.heroSpeed)})
    this.showMonDamage()
    this.props.hurt(newHero)
  }


  render() {
      console.log(this.state)
        return (
            <div className='attacks'>
                {this.state.heroSpeed >= this.state.monsterSpeed
                    ? <button onClick={this.monsterAttack(this.props.currentHero, this.props.currentMonster)}>Attacked!</button>
                    : <button onClick={() => this.heroAttack(this.props.currentHero, this.props.currentMonster)}>Attack</button>
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

export default withRouter(connect(mapStateToProps, {attack, hurt, addRewards})(AtkInterface));