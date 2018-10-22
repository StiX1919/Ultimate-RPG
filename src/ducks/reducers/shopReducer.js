import axios from "axios";


//Action Constants

const GET_SHOP = 'GET_SHOP'
const PURCHASE_ITEM = "PURCHASE_ITEM"

//Initial State

const initialState = {
    shopItems: []

}


//Action Creators


export function getShop() {
    return {
        type: GET_SHOP,
        payload: axios.get('/api/getShop')
    }
}

export function purchaseItem(item, oldInv, cost, oldGold) {
    let newInv = oldInv
    let newGold = oldGold

    newInv.push(item)
    newGold -= cost
    return {
        type: PURCHASE_ITEM,
        payload: {newInv, newGold}
    }
}




//Reducer

export default function heroReducer(state=initialState, action) {
    switch(action.type) {
        case GET_SHOP + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_SHOP + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                shopItems: action.payload.data
            });
        default:
            return state
    }

}