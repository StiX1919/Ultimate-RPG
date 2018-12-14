import React, { Component } from 'react';
import styled from 'styled-components'
// import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from './cbComponents/StatBox/StatBox'
// import Equipment from './cbComponents/equipment/equipment'
// import Inventory from './cbComponents/Inventory/Inventory'

import {beatMonster, levelUp, getWeaponExp, selectHero} from '../../../../../../../ducks/reducers/heroReducer'
import { getDemoCharacter } from '../../../../../../../ducks/reducers/userReducer'

import {attack} from '../../../../../../../ducks/reducers/monsterReducer'


const Arrow = styled.div`
background-color: ${props => props.bColor}
height: 30px;
width: ${props => {
    console.log('in styled components', props.maxLength, props.stat)
    if(props.maxLength === props.stat){
        return 100
    } else {
        if(props.stat < 0){
            props.stat = 0
        }
        return 100 * (props.stat / props.maxLength)
    }
}}%;
`
const Stats = styled.div`
width: 50%;
/* height: 20vh; */

background: #F7F9FF;
display: flex;
/* flex-direction: column; */
justify-content: space-between;
`


class CharacterBox extends Component {
    constructor(){
        super()
        this.state = {
            hero: null,
            equipment: null,
            invOpen: false
        }

    }
    componentDidMount() {
        this.setState({hero: this.props.currentHero, equipment: this.props.currentEquipment})
        
    }

    openInventory() {
        this.setState({invOpen: !this.state.invOpen})
    }
      

    render() {
        let hero = this.props.currentHero

        let topNum = Math.max(hero.strength, hero.intelligence, hero.speed, hero.endurance)
        

        //Showing currently equipped items

        // let liveEquipment = 'Loading...'
        // if(this.state.equipment) {
        //     liveEquipment = Object.keys(this.state.equipment).map(item => {
        //         return <Equipment type={item} equipObj={this.state.equipment[item]}/>
        //     })
        // }

        // let inventory = <h3>Empty</h3>
        // if (this.props.currentInventory[0]){
        //     inventory = this.props.currentInventory.map(item => {
        //         return <Inventory item={item} equipment={this.state.equipment} remount={this.setHero}/>
        //     })}
        
        // let buffs = {str: 0, def: 0, spd: 0}
        // if(this.state.equipment) {
        //     Object.keys(this.state.equipment).map((item, index) => {
        //         buffs.str += this.state.equipment[item].pwr ? this.state.equipment[item].pwr : 0
        //         buffs.def += this.state.equipment[item].def ? this.state.equipment[item].def : 0
        //         buffs.spd += this.state.equipment[item].spd ? this.state.equipment[item].spd : 0
        //     }) 
        // }

        return (
            
            <div className='charBox'>
                {hero ? 
                    <div>
                        <div>
                            <h3>{hero.hero_class}: {hero.hero_name}</h3>
                            <h3>Level: {hero.hero_level}</h3>
                            <div style={{display: 'flex'}}>
                                <h3 style={{width: '20%'}}>HP:  </h3>
                                <div style={{backgroundColor: 'red', width: '100%'}}>
                                    <Arrow bColor='green' stat={hero.hero_hp} maxLength={this.props.maxHP}>{`${hero.hero_hp}/${this.props.maxHP}`}</Arrow>
                                </div>
                            </div>
                                <div style={{display: 'flex'}}>
                                <h5 style={{width: '20%'}}>SP:  </h5>
                                <div style={{backgroundColor: 'red', width: '100%'}}>
                                    <Arrow bColor='orange' stat={hero.hero_sp} maxLength={this.props.maxSP}>{`${hero.hero_sp}/${this.props.maxSP}`}</Arrow>
                                </div>
                            </div>
                                <div style={{display: 'flex'}}>
                                <h5 style={{width: '20%'}}>MP:  </h5>
                                <div style={{backgroundColor: 'red', width: '100%'}}>
                                    <Arrow bColor='blue' stat={hero.hero_mp} maxLength={this.props.maxMP}>{`${hero.hero_mp}/${this.props.maxMP}`}</Arrow>
                                </div>
                            </div>
                
                            <h4>EXP: {hero.hero_exp + this.props.rewards.exp}/{this.props.nextLevel}</h4>
                            {hero.hero_exp + this.props.rewards.exp >= this.props.nextLevel &&
                                <button onClick={() => this.props.levelUp(this.props.nextLevel, this.props.currentHero)}>Level Up</button>
                            }
                            
                        </div>
                            
                        <h3>Extra Stats: {hero ? hero.extra_stats : 0}</h3>
                        <StatBox hero={hero} />
                            
                        <h4>Gold: {hero.gold + this.props.rewards.gold}</h4>
                    </div>
                : null}
                
                
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer, ...state.userReducer})

export default withRouter(connect(mapStateToProps, {levelUp, attack, beatMonster, getWeaponExp, getDemoCharacter, selectHero})(CharacterBox));
