import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './MonsterBox.css';

class MonsterBox extends Component {

    render() {
        return (
            <div>
                {this.props.currentMonster &&
                <div className='mainBox'>
                    <h2>{`Level ${this.props.currentMonster.level} ${this.props.currentMonster.name}`}</h2>
                    <img className='monsterImg' src={this.props.currentMonster.img_link} alt=''/>
                    <h4>{this.props.currentMonster.description}</h4>
                    <h4>Current HP: {this.props.currentMonster.hp}</h4>
                </div>
                }
            </div>
        )
    }
///sneaky commit
}   
const mapStateToProps = state => ({...state.monsterReducer})

export default connect(mapStateToProps, {})(MonsterBox);