import axios from 'axios';

//Action Constants

const GET_MONSTER = 'GET_MONSTER';
const GET_MONSTERS = 'GET_MONSTERS';
const SET_MONSTER = 'SET_MONSTER';

const ATTACKING = 'ATTACKING';
const REMOVE_MON = 'REMOVE_MON';

const MOVE_MON = 'MOVE_MON';
const MATCHED_MON = 'MATCHED_MON'

//Initial State

const initialState = {
  // monster info
  monsterStatus: 'alive',
  currentMonster: null,
  monsters: [],

  combatMons: []
};

//Action Creators
export function setMonster(mon) {
  return {
    type: SET_MONSTER,
    payload: mon
  };
}

export function getMonster() {
  return {
    type: GET_MONSTER,
    payload: axios.get('/api/getMonster').then(response => {
      return response.data;
    })
  };
}

export function attack(newMon) {
  return {
    type: ATTACKING,
    payload: newMon
  };
}

export function getMonsters(X, Y) {
  return {
    type: GET_MONSTERS,
    payload: axios.get('/api/getMonsters').then(response => {
      let index = 0
      const areaMonsters = response.data.map(monster => {
        let randomX = Math.floor(Math.random() * (X * 10)) + 1;
        let randomY = Math.floor(Math.random() * (Y * 10)) + 1;
        index += 1

        return { index, X: randomX, Y: randomY, monsterInfo: { ...monster } };
      });
      return areaMonsters;
    })
  };
}

export function removeMonster(id) {
  return {
    type: REMOVE_MON,
    payload: id
  };
}

export function moveMonsters(X, Y, mons, entered) {
  let types = ['X', 'Y'];
  let directions = ['>', '<'];
  if(entered === true){
    X = 1
    Y = 1
  }

  const movedMons = mons.map(monster => {
    let randomMove = types[Math.floor(Math.random() * types.length)];
    let randomDirec = directions[Math.floor(Math.random() * directions.length)];

    switch (randomDirec) {
      case '>':
        if (randomMove === 'X') {
          if (monster[randomMove] <= X * 10 - 1) {
            return { ...monster, [randomMove]: ++monster[randomMove] };
          } else return monster;
        } else if (randomMove === 'Y') {
          if (monster[randomMove] <= Y * 10 - 1) {
            return { ...monster, [randomMove]: ++monster[randomMove] };
          } else return monster;
        }
        break;
      case '<':
        if (randomMove === 'X') {
          if (monster[randomMove] > (X - 1) * 10 + 1) {
            return { ...monster, [randomMove]: --monster[randomMove] };
          } else return monster;
        } else if (randomMove === 'Y') {
          if (monster[randomMove] > (Y - 1) * 10 + 1) {
            return { ...monster, [randomMove]: --monster[randomMove] };
          } else return monster;
        }
        break;
      default:
        return null;
    }
  });
  return {
    type: MOVE_MON,
    payload: movedMons
  };
}

export function matchedMonsters(X, Y){
    let xArea = [X - 1, X, X + 1]
    let yArea = [Y - 1, Y, Y + 1]

    return {
        type: MATCHED_MON,
        payload: {xArea, yArea}
    }
}

//Reducer

export default function monsterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MONSTER + '_PENDING':
      return Object.assign({}, state, {
        isLoading: true
      });
    case GET_MONSTER + '_FULFILLED':
      return Object.assign({}, state, {
        isLoading: false,
        currentMonster: action.payload,
        monsterHP: action.payload.HP,
        monsterStatus: 'alive'
      });

    case ATTACKING:
      return {
        ...state,
        currentMonster: action.payload,
        monsterHP: action.payload.HP
      };

    case GET_MONSTERS + '_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case GET_MONSTERS + '_FULFILLED':
      return {
        ...state,
        isLoading: false,
        monsters: action.payload
      };

    case SET_MONSTER:
      return {
        ...state,
        currentMonster: action.payload
      };

    case REMOVE_MON:
      let slicedMons = state.monsters.filter(monster => {
        console.log(monster.index, action.payload, monster.index === action.payload)
        return monster.index !== +action.payload
          
      });

      return {
        ...state,
        monsters: slicedMons
      };

    case MOVE_MON:
      return {
        ...state,
        monsters: action.payload
      };

    case MATCHED_MON:
        const {xArea, yArea} = action.payload

        let combatMons = state.monsters.filter(mon => {
            return (xArea.includes(mon.X) && yArea.includes(mon.Y))
        })
        console.log('combat', combatMons)
      return {
          ...state,
          combatMons
      }

    default:
      return state;
  }
}
