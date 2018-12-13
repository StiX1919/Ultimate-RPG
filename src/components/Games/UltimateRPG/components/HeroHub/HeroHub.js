import React, { Component } from 'react';
import styled from 'styled-components'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './HeroHub.css';

import { getMap } from '../../../../../ducks/reducers/mapReducer'
import { getMonsters } from '../../../../../ducks/reducers/monsterReducer'


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

class HeroHub extends Component {
  constructor(props) {
    super()
    this.state = {
      shop: false,
      skills: false,
      skillView: false,
      skillArr: []
    }
    this.openShop = this.openShop.bind(this)

  }
  componentDidMount() {
    this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    if(!this.props.mapReducer.areaMap[0]){
        this.props.getMap(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    }
  }

  openShop() {
    if(this.state.shop === true){
      this.setState({shop: false})
    } else this.setState({shop: true})
  }

  openSkillView() {
    if(this.state.skillView === true){
      this.setState({skillView: false})
    } else this.setState({skillView: true})
  }

  render() {
    let hero = this.props.heroReducer.currentHero
    let topNum = Math.max(hero.strength, hero.intelligence, hero.speed, hero.endurance)

    return (
    <div className='hub-page'>
        <div className='hub-title'>
          <h3>{hero.hero_class}</h3>
          <h1>{hero.hero_name}</h1>
        </div>

        <div className='hero-hub'>
            <img className='hero-pix' src={hero.pix_art} alt='hero-pic'/>
            <div className='stats'>
                <div className='points'>
                    <h2>HP: {hero.hero_hp}</h2>
                    <h3>MP: {hero.hero_mp}</h3>
                    <h3>SP: {hero.hero_sp}</h3>
                </div>
                <Stats>
                    <Arrow bColor='red' stat={hero.strength} maxLength={topNum}>Str: {hero.strength}</Arrow>
                    <Arrow bColor='green' stat={hero.speed} maxLength={topNum}>Spd: {hero.speed}</Arrow>
                    <Arrow bColor='yellow' stat={hero.endurance} maxLength={topNum}>End: {hero.endurance}</Arrow>
                    <Arrow bColor='blue' stat={hero.intelligence} maxLength={topNum}>Int: {hero.intelligence}</Arrow>
                </Stats>
            </div>
        </div>

        <div className='extra-stats'>
            <h1>Future stats and stuff go here!!! Maybe current equipment and abilities??</h1>
        </div>

    </div>
    );
  }
}

const mapStateToProps = state => ({heroReducer: state.heroReducer, userReducer: state.userReducer, mapReducer: state.mapReducer, monsterReducer: state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMap, getMonsters })(HeroHub));