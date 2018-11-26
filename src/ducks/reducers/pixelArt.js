import axios from "axios";


//Action Constants

const PIX_FREE_MONS = 'PIX_FREE_MONS'
const PIX_FREE_WEAPONS = 'PIX_FREE_WEAPONS'

const SUBMIT = 'SUBMIT'

//Initial State

const initialState = {
    monsters: [],
    weapons: [],

    isLoading: false
}


//Action Creators


export function getPixMons() {
    return {
        type: PIX_FREE_MONS,
        payload: axios.get('/api/pixMons')
    }
}

export function getPixWeapons() {
    return {
        type: PIX_FREE_WEAPONS,
        payload: axios.get('/api/pixWeapons')
    }
}

export function submitArt(table, name, image){
    return {
        type: SUBMIT,
        payload: axios.post('/api/submitArt', {table, name, image})
    }
}
export function submitHeroArt(image, heroID){
    return {
        type: SUBMIT,
        payload: axios.post('/api/submitHeroArt', {image, heroID})
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

        case PIX_FREE_WEAPONS + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case PIX_FREE_WEAPONS + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                weapons: action.payload.data
            });


        default:
            return state
    }

}