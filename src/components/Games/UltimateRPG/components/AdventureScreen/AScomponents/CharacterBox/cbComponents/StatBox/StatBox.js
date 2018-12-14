import React, { Component } from 'react';
import styled from 'styled-components'
// import axios from 'axios'

import {connect} from 'react-redux'
import './StatBox.css';

const Arrow = styled.div`
    background-color: ${props => props.bColor}
    height: 30px;
    width: ${props => {
        if(props.maxLength === props.stat){
            return 100
        } else {
            return 100 * (props.stat / props.maxLength)
        }
    }}%;
    color: 'white';
`
const Stats = styled.div`
    width: 100%;
    /* height: 20vh; */

    background: #F7F9FF;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
`


class StatBox extends Component {
    constructor(){
        super()
        this.state = {

        }


    }

    render() {

        let hero = this.props.hero
        
        let topNum = Math.max(hero.strength, hero.intelligence, hero.speed, hero.endurance)

        return (
            <div>
                <Stats>
                    <div className='stat-button'>
                        <h2>Strength:</h2>
                        {hero.extra_stats > 0 
                            ? <button >{'+'}</button>
                            : <button disabled>{'+'}</button>
                        }
                    </div>
                    <div className='stat-bar'>
                        <Arrow bColor='#DA4167' stat={hero.strength} maxLength={topNum}>{hero.strength}</Arrow>
                    </div>
                </Stats>
                <Stats>
                    <div className='stat-button'>
                        <h2>Speed:</h2>
                        {hero.extra_stats > 0 
                            ? <button>{'+'}</button>
                            : <button disabled>{'+'}</button>
                        }
                    </div>
                    <div className='stat-bar'>
                        <Arrow bColor='#95E06C' stat={hero.speed} maxLength={topNum}>{hero.speed}</Arrow>
                    </div>
                </Stats>
                <Stats>
                    <div className='stat-button'>
                        <h2>Endurance:</h2>
                        {hero.extra_stats > 0 
                            ? <button>{'+'}</button>
                            : <button disabled>{'+'}</button>
                        }
                    </div>
                    <div className='stat-bar'>
                        <Arrow bColor='#E6AF2E' stat={hero.endurance} maxLength={topNum}>{hero.endurance}</Arrow>
                    </div>
                </Stats>
                <Stats>
                    <div  className='stat-button'>
                        <h2>Intelligence:</h2>
                        {hero.extra_stats > 0 
                            ? <button>{'+'}</button>
                            : <button disabled>{'+'}</button>
                        }
                    </div>
                    <div className='stat-bar'>
                        <Arrow bColor='#1C448E' stat={hero.intelligence} maxLength={topNum}>{hero.intelligence}</Arrow>
                    </div>
                </Stats>
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.heroReducer})

export default connect(mapStateToProps, {})(StatBox);