import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './MonsterBox.css';

class MonsterBox extends Component {

    render() {
        const monster = this.props.currentMonster.monsterInfo
        return (
            <div>
                {this.props.currentMonster &&
                <div className='mainBox'>
                    <h2>{`Level ${monster.level} ${monster.name}`}</h2>
                    <img className='monsterImg' src={monster.img_link} alt=''/>
                    <h4>{monster.description}</h4>
                    <h4>Current HP: {monster.hp}</h4>
                </div>
                }
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.monsterReducer})

export default connect(mapStateToProps, {})(MonsterBox);