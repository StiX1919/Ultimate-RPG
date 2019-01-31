import axios from "axios";

require('dotenv').config()
//Action Constants

const GET_CLASSES = "GET_CLASSES"
const GET_RACES = "GET_RACES"
const NEW_HERO = "NEW_HERO"

const NEW_STATS = 'NEW_STATS'

const USE_STATS = 'USE_STATS'

//Initial State

const initialState = {
    testNum: 0,
    classes: [],
    races: [],
    isLoading: false,
    heroData: null,
    stats: [{type:'Power', value: 500}, {type:'Endurance', value: 500}, {type:'Speed', value: 500}, {type:'Wisdom', value: 500}, {type:'Intelligence', value: 500},],

    startingStats: 10
    
}


//Action Creators
//update character cards tomorrow

export function useStats(stat){
    return {
        type: USE_STATS,
        payload: stat
    }
}

export function createNewHero(heroObj) {
    let luck = Math.floor(Math.random() * 10) + 1
    if(luck === process.env.REACT_APP_STAGE_1_LUCK){
        luck = Math.floor(Math.random() * 25) + 1
    }
    if(luck === process.env.REACT_APP_STAGE_2_LUCK){
        luck = Math.floor(Math.random() * 50) + 1
    }
    if(luck === process.env.REACT_APP_STAGE_3_LUCK){
        luck = Math.floor(Math.random() * 100) + 1
    }
    let newObj = {...heroObj, stats: initialState.stats}
    return {
        type: NEW_HERO,
        payload: axios.post('/api/newHero', {...newObj, luck})
    }
}

export function chooseStats(newStats) {
    return {
        type: NEW_STATS,
        payload: newStats
    }
}




//Reducer

export default function CCReducer(state=initialState, action) {
    switch(action.type) {
        case GET_CLASSES + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_CLASSES + "_FULFILLED":
            return {
                ...state,
                isLoading: false,
                classes: action.payload.data
            }
        case GET_RACES + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_RACES + "_FULFILLED":
            return {
                ...state,
                isLoading: false,
                races: action.payload.data
            }

        case NEW_STATS:
            return {
                ...state,
                stats: action.payload
            }
        
        case USE_STATS:
            return {
                ...state,
                startingStats: action.payload
            }
            

        default:
            return state
    }

}