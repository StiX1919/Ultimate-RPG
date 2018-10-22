import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './Shop.css';

import ShopItems from './shopComponents/shopItems/ShopItems'

import {getShop, purchaseItem} from '../../../../../../../ducks/reducers/shopReducer'

class Shop extends Component {
    constructor(){
        super()
        this.state = {
        }


    }
    componentDidMount() {
        this.props.getShop()
    }

    
      

    render() {
        let shopItems = <h3>Loading...</h3>

        if (this.props.shopItems[0]){
            shopItems = this.props.shopItems.map((item, index)=> {
                return <ShopItems item={item} gold={this.props.gold}/>
            })
        }
        return (
            <div className='shopBox'>
                <h2>Local Shop</h2> 
                <hr/>
                <div className='descriptors'>
                    <h4>Name</h4>
                    <h4>Pwr</h4>
                    <h4>Spd</h4>
                    <h4>Def</h4>
                    <h4>Price</h4>
                </div>
                <hr/>
                
                {shopItems}
                
            </div>
        )
    }

}   
const mapStateToProps = state => ({...state.reducer, ...state.heroReducer, ...state.shopReducer})

export default connect(mapStateToProps, {getShop, purchaseItem})(Shop);