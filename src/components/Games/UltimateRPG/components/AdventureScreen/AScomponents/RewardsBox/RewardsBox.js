import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './RewardsBox.css';

class RewardsBox extends Component {

    render() {
        return (
            <div className='mainBox'>
                <h2>Potion</h2>
                <h4>5 gold</h4>
                <h4>15 exp</h4>
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.monsterReducer})

export default connect(mapStateToProps, {})(RewardsBox);