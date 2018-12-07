import React, { Component } from 'react';
// import axios from 'axios'
import { getRewards } from '../../../../../../../ducks/reducers/monsterReducer'

import {connect} from 'react-redux'
import './RewardsBox.css';

class RewardsBox extends Component {

    componentDidMount(){
        this.props.getRewards(this.props.currentMonster, this.props.mapX, this.props.mapY)
    }

    render() {
        return (
            <div className='mainBox'>
                <h1>Rewards:</h1>
                <h4>Gold: {this.props.rewards.gold}</h4>
                <h4>Exp: {this.props.rewards.exp}</h4>
                <h4>Items: tbd</h4>
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.monsterReducer, ...state.mapReducer})

export default connect(mapStateToProps, { getRewards })(RewardsBox);