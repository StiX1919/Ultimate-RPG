import React, {Component} from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'


import './CaSeCard.css'

const Card = styled.div`
    background: #F7F9FF;
    width: 300px;
    height: 200px;

    display: flex;
    justify-content: space-between
`

const Stats = styled.div`
    width: 150px;
    height: 100px;

    background: #F7F9FF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Arrow = styled.div`
    background-color: ${props => props.bColor}
    height: 100%
    width: ${props => {
        if(props.stat === 0){
            return 0
        }
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
                <img className='hero_img' src={hero.pix_art} alt='hero_pic'/>
                <div>
                    <h3>{hero.hero_class}</h3>
                    <h2>{hero.hero_name}</h2>
                    <Stats>
                        {/* color coordinate and style stats. red, yellow, green, blue*/}
                        <div className='arrow-container'>
                            <h3 style={{position: 'absolute'}}>Str: {hero.strength}</h3>
                            <Arrow bColor='red' stat={hero.strength} maxLength={topNum}></Arrow>
                        </div>
                        <div style={{width: '100%', height: '20px'}}>
                            <h3 style={{position: 'absolute'}}>Spd: {hero.speed}</h3>
                            <Arrow bColor='green' stat={hero.speed} maxLength={topNum}></Arrow>    
                        </div>
                        <div style={{width: '100%', height: '20px'}}>
                            <h3 style={{position: 'absolute'}}>End: {hero.endurance}</h3>
                            <Arrow bColor='yellow' stat={hero.endurance} maxLength={topNum}></Arrow>   
                        </div>
                        <div style={{width: '100%', height: '20px'}}>
                            <h3 style={{position: 'absolute'}}>Int: {hero.intelligence}</h3>
                            <Arrow bColor='blue' stat={hero.intelligence} maxLength={topNum}></Arrow>   
                        </div>
                    </Stats>
                </div>
            </Card>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer})

export default connect(mapStateToProps)(CaSeCard);