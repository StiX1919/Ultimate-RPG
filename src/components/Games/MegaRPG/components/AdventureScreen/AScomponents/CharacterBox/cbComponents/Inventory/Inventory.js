import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './inventory.css';

import {equipGear} from '../../../../../../../../../ducks/reducers/heroReducer'



class Inventory extends Component {
    constructor(){
        super()
        this.state = {
        }


    }     
    async equiping(item, equip){
        try {
            await this.props.equipGear(item, equip)
            await this.props.remount()
        } catch(err) {
            console.log(err)
        }
        
    }

    render() {
        let item = this.props.item
        return (
            
            <div className="inventoryItems">
                <h5>{item.name}</h5>
                <button onClick={() => this.equiping(item, this.props.equipment)}>Equip</button>
            </div>
 
        )
    }

}   
const mapStateToProps = state => ({...state.heroReducer})

export default connect(mapStateToProps, {equipGear})(Inventory);