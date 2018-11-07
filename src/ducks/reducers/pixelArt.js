import axios from "axios";


//Action Constants

const PIX_FREE_MONS = 'PIX_FREE_MONS'
const PIX_FREE_ITEMS = 'PIX_FREE_ITEMS'

//Initial State

const initialState = {
    monsters: [],
    items: [],

    isLoading: false
}


//Action Creators


export function getPixMons() {
    return {
        type: PIX_FREE_MONS,
        payload: axios.get('/api/pixMons')
    }
}

export function getPixItems() {
    return {
        type: PIX_FREE_ITEMS,
        payload: axios.get('/api/pixItems')
    }
}


//Reducer

export default function pixelArt(state=initialState, action) {
    switch(action.type) {
        case PIX_FREE_MONS + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case PIX_FREE_MONS + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                monsters: action.payload.data
            });

        case PIX_FREE_ITEMS + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case PIX_FREE_ITEMS + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                items: action.payload.data
            });


        default:
            return state
    }

}