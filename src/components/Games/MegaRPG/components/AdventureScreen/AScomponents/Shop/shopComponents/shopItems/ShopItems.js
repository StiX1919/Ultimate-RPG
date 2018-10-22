import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './ShopItems.css';


import {purchaseItem} from '../../../../../../../../../ducks/reducers/heroReducer'

class ShopItems extends Component {
    constructor(){
        super()
        this.state = {
        }


    }     

    render() {
        let item = this.props.item
        // let gold = this.props.gold
        return (
            
             <div className='descriptors2'>
                <h4>{item.name}</h4>
                <h4>{item.pwr}</h4>
                <h4>{item.spd}</h4>
                <h4>{item.def}</h4>
                <h4>{item.price}</h4>
                <button onClick={() => this.props.purchaseItem(item, this.props.currentInventory, item.price, this.props.gold)}>Buy</button>
            </div>
 
        )
    }

}   
const mapStateToProps = state => ({...state.reducer, ...state.heroReducer})

export default connect(mapStateToProps, {purchaseItem})(ShopItems);