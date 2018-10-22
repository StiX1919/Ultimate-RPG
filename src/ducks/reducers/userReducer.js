import axios from "axios";


//Action Constants

const GET_USER = "GET_USER"

const GET_HEROES = 'GET_HEROES'

const DEMO_HERO = 'DEMO_HERO'



//Initial State

const initialState = {
    testNum: 0,
    isLoading: false,
    user: null,
    heroes: []
    
}


//Action Creators

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/api/getUser')
    }
}
export function getHeroes() {
    return {
        type: GET_HEROES,
        payload: axios.get('/api/getHeroes')
    }
}

export function getDemoCharacter(){
    return {
        type: DEMO_HERO,
        payload: axios.get('/api/demo')
    }
}




//Reducer

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case GET_USER + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_USER + "_FULFILLED":
            return {
                ...state,
                isLoading: false,
                user: action.payload.data
            }

        case GET_HEROES + "_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case GET_HEROES + "_FULFILLED":
            return {
                ...state,
                isLoading: false,
                heroes: action.payload.data
            }

        case DEMO_HERO + '_PENDING':
            return {
                ...state, 
                isLoading: true
            }
        case DEMO_HERO + '_FULFILLED':
            return {
                ...state,
                isLoading: false,
                heroes: action.payload.data
            }
        default:
            return state
    }

}