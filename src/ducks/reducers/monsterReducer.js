import axios from "axios";


//Action Constants

const GET_MONSTER = "GET_MONSTER"
const GET_MONSTERS = 'GET_MONSTERS'
const SET_MONSTER = 'SET_MONSTER'

const ATTACKING = "ATTACKING"
const REMOVE_MON = 'REMOVE_MON'



//Initial State

const initialState = {

    // monster info
    monsterStatus: 'alive',
    currentMonster: null,
    monsters: []
    
}


//Action Creators
export function setMonster(mon){
    return {
        type: SET_MONSTER,
        payload: mon
    }
}

export function getMonster() {
    return {
        type: GET_MONSTER,
        payload: axios.get('/api/getMonster').then(response => {
            return response.data
            // this.setState({currentMonster: response.data, currentMonsterHP: response.data.HP, monsterStatus: 'alive', exp: currExp})
            
          })
    }
    
  }





export function attack(newMon) {
    return {
        type: ATTACKING,
        payload: newMon
    }
}

export function getMonsters() {
    return {
        type: GET_MONSTERS,
        payload: axios.get('/api/getMonsters')
    }

}

export function removeMonster(id){
    return {
        type: REMOVE_MON,
        payload: id
    }
}



//Reducer

export default function monsterReducer(state=initialState, action) {
    switch(action.type) {

        case GET_MONSTER + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_MONSTER + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                currentMonster: action.payload,
                monsterHP: action.payload.HP,
                monsterStatus: 'alive'
            });

        case ATTACKING:
            return {...state, currentMonster: action.payload, monsterHP: action.payload.HP}

        case GET_MONSTERS + "_PENDING": 
            return {
                ...state,
                isLoading: true
            }
        
        case GET_MONSTERS + "_FULFILLED": 
            return {
                ...state,
                isLoading: false,
                monsters: action.payload.data
            }

        case SET_MONSTER:
            return {
                ...state,
                currentMonster: action.payload
            }

        case REMOVE_MON:
            let slicedMons = state.monsters.slice()
            slicedMons.splice(action.payload, 1)
            
            return {
                ...state,
                monsters: slicedMons
            }

        default:
            return state
    }

}