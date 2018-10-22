import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './equipment.css';

class Equipment extends Component {
    constructor(){
        super()
        this.state = {

        }


    }

    render() {
        let currItem = this.props.equipObj
        return (
            <div className='statBox'>
                <h4>{this.props.type}: {currItem.name ? currItem.name : currItem}</h4>
            </div>
        )
    }
}   
const mapStateToProps = state => ({...state.heroReducer})

export default connect(mapStateToProps, {})(Equipment);