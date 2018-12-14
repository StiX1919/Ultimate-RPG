import React, { Component } from 'react';
import styled from 'styled-components'
// import axios from 'axios'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './CharacterBox.css';

import StatBox from './cbComponents/StatBox/StatBox'
// import Equipment from './cbComponents/equipment/equipment'
// import Inventory from './cbComponents/Inventory/Inventory'

import {statModifier, beatMonster, levelUp, getWeaponExp, selectHero} from '../../../../../../../ducks/reducers/heroReducer'
import { getDemoCharacter } from '../../../../../../../ducks/reducers/userReducer'

import {attack} from '../../../../../../../ducks/reducers/monsterReducer'


const Arrow = styled.div`
background-color: ${props => props.bColor}
height: 60px;
width: ${props => {
    if(props.maxLength === props.stat){
        return 100
    } else {
        return 100 * (props.stat / props.maxLength)
    }
}}%;
`
const Stats = styled.div`
width: 100%;
height: 35vh;

background: #F7F9FF;
display: flex;
flex-direction: column;
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
                            <h3>{hero ? hero.hero_name : 'nameless'}</h3>
                            <h4>Level: {hero.hero_level}</h4>
                            <h3>HP: {hero.hero_hp}</h3>
                
                            {hero.hero_exp >= this.props.nextLevel &&
                                <button onClick={() => this.props.levelUp(this.props.exp, this.props.level, this.props.nextLevel, this.props.currentHero)}>Level Up</button>
                            }
                            <h4>EXP: {hero.hero_exp + this.props.rewards.exp}/{this.props.nextLevel}</h4>
                            <h4>Gold: {hero.gold + this.props.rewards.gold}</h4>
                            
                        </div>
                        
                        <h3>Extra Stats: {hero ? hero.extra_stats : 0}</h3>
                        <Stats>
                            <Arrow bColor='red' stat={hero.strength} maxLength={topNum}>Str: {hero.strength}</Arrow>
                            <Arrow bColor='green' stat={hero.speed} maxLength={topNum}>Spd: {hero.speed}</Arrow>
                            <Arrow bColor='yellow' stat={hero.endurance} maxLength={topNum}>End: {hero.endurance}</Arrow>
                            <Arrow bColor='blue' stat={hero.intelligence} maxLength={topNum}>Int: {hero.intelligence}</Arrow>
                        </Stats>

                        <StatBox statType='Strength' statModifier={this.setHero} currStat={hero.strength} statsLeft={hero ? hero.extra_stats : 0}/>
                        <StatBox statType='Speed' statModifier={this.setHero} currStat={hero.speed} statsLeft={hero ? hero.extra_stats : 0}/>
                        <StatBox statType='Endurance' statModifier={this.setHero} currStat={hero.endurance} statsLeft={hero ? hero.extra_stats : 0}/>
                        <StatBox statType='Intelligence' statModifier={this.setHero} currStat={hero.intelligence} statsLeft={hero ? hero.extra_stats : 0}/>
                    </div>
                : null}
                
                
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer, ...state.userReducer})

export default withRouter(connect(mapStateToProps, {statModifier, levelUp, attack, beatMonster, getWeaponExp, getDemoCharacter, selectHero})(CharacterBox));
