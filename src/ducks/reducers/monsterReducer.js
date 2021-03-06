import axios from 'axios';

//Action Constants

const GET_MONSTER = 'GET_MONSTER';
const GET_MONSTERS = 'GET_MONSTERS';
const SET_MONSTER = 'SET_MONSTER';

const ATTACKING = 'ATTACKING';
const REMOVE_MON = 'REMOVE_MON';

const MOVE_MON = 'MOVE_MON';
const MATCHED_MON = 'MATCHED_MON'

const GET_REWARDS = 'GET_REWARDS'

//Initial State

const initialState = {
  // monster info
  monsterStatus: 'alive',
  currentMonster: null,
  monsters: [],

  combatMons: [],
  newMonIndex: 9,

  rewards: {
    gold: 0,
    items: [],
    exp: 0
  }
};

//Action Creators
export function setMonster(mon) {
  return {
    type: SET_MONSTER,
    payload: mon
  };
}

export function getMonster(X, Y) {
  return {
    type: GET_MONSTER,
    payload: axios.get(`/api/getMonster/${X}/${Y}`).then(response => {
      let randomX = (Math.floor(Math.random() * -10 ) + 1) + (X * 10);
      let randomY = (Math.floor(Math.random() * -10 ) + 1) + (Y * 10);
      return { X: randomX, Y: randomY, monsterInfo: { ...response.data } }
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
    payload: axios.get(`/api/getMonsters/${X}/${Y}`).then(response => {
      let index = 0
      const areaMonsters = response.data.map(monster => {
        let randomX = (Math.floor(Math.random() * -10 ) + 1) + (X * 10);
        let randomY = (Math.floor(Math.random() * -10 ) + 1) + (Y * 10);
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


export function getRewards(monster, X, Y){
  let gold = (monster.gold + X + Y) * monster.level,
    items = [],
    exp = monster.exp_value * monster.level



  return {
    type: GET_REWARDS,
    payload: {gold, items, exp}
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

      let index = state.newMonIndex + 1
      
      return Object.assign({}, state, {
        isLoading: false,
        monsters: [...state.monsters, {...action.payload, index}],
        newMonIndex: index
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
      console.log(action.payload, 'reducer monster')
      return {
        ...state,
        currentMonster: action.payload
      };

    case REMOVE_MON:
      console.log(action.payload, state.monsters)
      let slicedMons = state.monsters.filter(monster => {
        return monster.index !== action.payload
          
      });

      return {
        ...state,
        monsters: slicedMons,
        currentMonster: null
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
      return {
          ...state,
          combatMons
      }

    case GET_REWARDS:
      let {gold, items, exp} = action.payload

      return {
        ...state,
        rewards: {
          ...state.rewards,
          gold,
          items,
          exp
        }
      }

    default:
      return state;
  }
}
