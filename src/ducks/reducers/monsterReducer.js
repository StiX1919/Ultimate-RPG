import axios from "axios";


//Action Constants

const GET_MONSTER = "GET_MONSTER"


const ATTACKING = "ATTACKING"


//Initial State

const initialState = {

    // monster info
    monsterStatus: 'alive',
    currentMonster: null
    
}


//Action Creators


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

        default:
            return state
    }

}