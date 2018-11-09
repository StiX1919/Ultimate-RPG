import React, {Component} from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'


import './CaSeCard.css'
const Card = styled.div`
    text-decoration: none;
`

const Stats = styled.div`
    width: 150px;
    height: 70px;

    background: #F7F9FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Arrow = styled.div`
    background-color: ${props => props.bColor}
    height: 15px;
    width: ${props => {
        if(props.maxLength === props.stat){
            return 100
        } else {
            return 100 * (props.stat / props.maxLength)
        }
    }}%;

`

class CaSeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const hero = this.props.hero
        let topNum = Math.max(hero.strength, hero.intelligence, hero.speed, hero.endurance)
        return(
            <Card className='hero_card'>
                <img className='hero_img' src={hero.picture} alt='hero_pic'/>
                <div>
                    <h3>{hero.hero_class}</h3>
                    <h2>{hero.hero_name}</h2>
                    <Stats>
                        {/* color coordinate and style stats. red, yellew, green, blue*/}
                        <Arrow bColor='red' stat={hero.strength} maxLength={topNum}>Str: {hero.strength}</Arrow>
                        <Arrow bColor='yellow' stat={hero.endurance} maxLength={topNum}>End: {hero.endurance}</Arrow>
                        <Arrow bColor='green' stat={hero.speed} maxLength={topNum}>Spd: {hero.speed}</Arrow>
                        <Arrow bColor='blue' stat={hero.intelligence} maxLength={topNum}>Int: {hero.intelligence}</Arrow>
                    </Stats>
                </div>
            </Card>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer})

export default connect(mapStateToProps)(CaSeCard);