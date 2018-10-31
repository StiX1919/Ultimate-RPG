import axios from "axios";


//Action Constants

const GET_MONSTER = "GET_MONSTER"
const GET_MONSTERS = 'GET_MONSTERS'
const SET_MONSTER = 'SET_MONSTER'

const ATTACKING = "ATTACKING"
const REMOVE_MON = 'REMOVE_MON'

const MOVE_MON = 'MOVE_MON'



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

export function getMonsters(X, Y) {
    return {
        type: GET_MONSTERS,
        payload: axios.get('/api/getMonsters').then ( response => {
                const areaMonsters = response.data.map(monster => {
                    let randomX = Math.floor(Math.random() * (X * 10)) + 1
                    let randomY = Math.floor(Math.random() * (Y * 10)) + 1
                    
                    return ({ X: randomX, Y: randomY, monsterInfo: {...monster}})
                  })
                return areaMonsters
                // this.setState({currentMonster: response.data, currentMonsterHP: response.data.HP, monsterStatus: 'alive', exp: currExp})
                
              
        })
    }

}

export function removeMonster(id){
    return {
        type: REMOVE_MON,
        payload: id
    }
}

export function moveMonsters(X, Y, mons){
    let types = ['X', 'Y']
    let directions = ['>', '<']

    const movedMons = mons.map( monster => {
      let randomMove = types[Math.floor(Math.random() * types.length)]
      let randomDirec = directions[Math.floor(Math.random() * directions.length)]

      switch(randomDirec){
        case '>':
          if(randomMove === 'X'){
            if(monster[randomMove] <= X * 10 - 1){
             return ({...monster, [randomMove]: ++monster[randomMove]})
            } else return (monster)
          } else if(randomMove === 'Y'){
            if(monster[randomMove] <= Y * 10 - 1){
             return ({...monster, [randomMove]: ++monster[randomMove]})
            } else return (monster)
          }
          break;
        case '<':
          if(randomMove === 'X'){
            if(monster[randomMove] > ((X - 1) * 10) + 1){
             return ({...monster, [randomMove]: --monster[randomMove]})
            } else return (monster)
          } else if(randomMove === 'Y'){
            if(monster[randomMove] > ((Y - 1) * 10) + 1){
             return ({...monster, [randomMove]: --monster[randomMove]})
            } else return (monster)
          }
          break;
        default: return null
      }

      return {
          type: MOVE_MON,
          payload: movedMons
      }

    })
}



//Reducer

export default function monsterReducer(state=initialState, action) {
    console.log('mon reducer', action)
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
                monsters: action.payload
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


        case MOVE_MON:
            return {
                ...state,
                monsters: action.payload
            }

        default:
            return state
    }

}