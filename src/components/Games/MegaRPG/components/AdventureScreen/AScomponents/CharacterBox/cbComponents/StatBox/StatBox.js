import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './StatBox.css';

class StatBox extends Component {
    constructor(){
        super()
        this.state = {

        }


    }

    render() {
        return (
            <div className='statBox'>
                <h4>Base {this.props.statType}: </h4>

                <h4>{this.props.currStat}</h4>
                {this.props.statsLeft > 0 &&
                    <button onClick={() => this.props.statModifier(this.props.currentHero, '+', (this.props.statType.toLowerCase()))}>{'>'}</button>
                }
                
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.heroReducer})

export default connect(mapStateToProps, {})(StatBox);