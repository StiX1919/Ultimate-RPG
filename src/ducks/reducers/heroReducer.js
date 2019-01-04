import axios from "axios";


//Action Constants

const SELECT_HERO = "SELECT_HERO"

const STAT_MODIFIER = "STAT_MODIFIER"
const ADD_STAT = 'ADD_STAT'

const GET_SHOP = 'GET_SHOP'
const PURCHASE_ITEM = "PURCHASE_ITEM"

const EQUIP_GEAR = 'EQUIP_GEAR'

const BEAT_MONSTER = 'BEAT_MONSTER'
const LEVEL_UP = 'LEVEL_UP'

const GET_WEAPON_EXP = 'GET_WEAPON_EXP'

const GET_DUNGEONS = 'GET_DUNGEONS'

const HURT = "HURT"
const ADD_REWARDS = 'ADD_REWARDS'

const GET_HERO = 'GET_HERO'

//Initial State

const initialState = {
    testNum: 0,
    currentHero: null,
    currentEquipment: {
        head: 'empty',
        chest: 'empty',
        arms: 'empty',
        legs: 'empty',
        weapon: 'empty'
    },
    currentInventory: [],
    exp: 0,
    nextLevel: 100,
    level: 1,
    gold: 10,
    maxHP: 0 ,
    maxMP: 0,
    maxSP: 0,
    bonusStats: 0,
    abilities: [],
    dungeons: [],

    isLoading: false

}


//Action Creators
export function getHero(){
    return {
        type: GET_HERO,
        payload: axios.get('/api/getHero')
    }
}



//grabs discovered dungeons on load
export function getDungeons(id){
    return {
        type: GET_DUNGEONS,
        payload: axios.get(`/api/getDungeons?heroID=${id}`)
    }
}
export function hurt(newHero){
    return {
        type: HURT,
        payload: newHero
    }
}

//grants weapon abilities and experience
export function getWeaponExp(weapon, abilities) {
    // let newAbils = abilities.map(abil => {
    //     if(abilities[0]){
    //         if(abil.name === weapon.weaponType){
    //             abil.exp++
    //         } else
    //         for(let i = 0; i < weapon.damageType; i++){
    //             if(abil.name === weapon.damageType[i]){
    //                 abil.exp++
    //             }
    //         }
    //     }
        
    // })

    return {
        type: GET_WEAPON_EXP,
        payload: null
    }
}


//resets exp and adds to level
export function levelUp(nextLevel, hero){
    
    let hero_level = hero.hero_level += 1
    let hero_exp = hero.hero_exp - nextLevel
    let newNextLevel = hero_level * 100
    let extra_stats = hero.extra_stats += 1

    let newHero = Object.assign({}, hero, {hero_level, extra_stats, hero_exp})

    return {
        type: LEVEL_UP,
        payload: {
            newNextLevel, newHero
        }
    }
}

export function beatMonster(mon, currExp, currGold) {
    let bonuses = {exp: currExp += mon.expValue, gold: currGold += mon.gold}
    return {
        type: BEAT_MONSTER,
        payload: bonuses
    }
}

export function equipGear(item, CE) {
    let newObj = CE
    newObj[item.type] = item
    return {
        type: EQUIP_GEAR,
        payload: newObj
    }
}

export function selectHero(hero) {

    let nextLevel = hero.hero_level * 100
    return {
        type: SELECT_HERO,
        payload: {hero, nextLevel}
    }
    
}

export function getShop() {
    return {
        type: GET_SHOP,
        payload: axios.get('/api/getShop').then(response => {
            return response.data
        })
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

export function addStat(newHero) {
    let finalHero = {
        ...newHero, 
        hero_hp: (newHero.strength + newHero.endurance) * 2,
        hero_mp: (newHero.intelligence + newHero.luck),
        hero_sp: (newHero.speed + newHero.endurance) 
    }
    return {
        type: ADD_STAT,
        payload: finalHero
    }
    
}

export function addRewards(rewards) {
    return function(dispatch){
        dispatch({
            type: ADD_REWARDS,
            payload: rewards
        })
        dispatch({
            type: 'GET_REWARDS',
            payload: {gold: 0, items: [], exp: 0}
        })
    }
}



//Reducer

export default function heroReducer(state=initialState, action) {
    switch(action.type) {
        case SELECT_HERO:
            return {
                ...state,
                currentHero: action.payload.hero,
                exp: action.payload.hero.hero_exp,
                level: action.payload.hero.hero_level,
                gold: action.payload.hero.gold,
                bonusStats: action.payload.hero.extra_stats,
                nextLevel: action.payload.nextLevel
            }
        case ADD_STAT:
            return {
                ...state,
                currentHero: action.payload,
                maxHP: action.payload.hero_hp,
                maxMP: action.payload.hero_mp,
                maxSP: action.payload.hero_sp
            }

        case GET_SHOP + "_PENDING":
            return Object.assign({}, state, {
                isLoading: true
            });
        case GET_SHOP + "_FULFILLED":
            return Object.assign({}, state, {
                isLoading: false,
                shopItems: action.payload
            });

        case `${GET_DUNGEONS}_PENDING`:
            return Object.assign({}, state, {
                isLoading: true
            });
        case `${GET_DUNGEONS}_FULFILLED`:
            return {...state, isLoading: false, dungeons: action.payload.data};

        case PURCHASE_ITEM:
            return Object.assign({}, state, {
                currentInventory: action.payload.newInv,
                gold: action.payload.newGold
            })
        
        case BEAT_MONSTER:
            return Object.assign({}, state, {
                exp: action.payload.exp,
                gold: action.payload.gold
            })

        case EQUIP_GEAR:
            return {
                ...state,
                currentEquipment: action.payload
            }

        case LEVEL_UP:
            return {
                ...state,
                currentHero: action.payload.newHero,
                nextLevel: state.nextLevel + action.payload.newNextLevel,
            }

        case HURT:
            return {
                ...state,
                currentHero: action.payload
            }

        case ADD_REWARDS:
            return {
                ...state,
                currentHero: {...state.currentHero, gold: state.currentHero.gold + action.payload.gold, hero_exp: state.currentHero.hero_exp + action.payload.exp}
            }

        case GET_HERO + '_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case GET_HERO + '_FULFILLED':
            if(action.payload.data[0]){
                return {
                    ...state,
                    isLoading: false,
                    currentHero: action.payload.data[0],
                    maxHP: action.payload.data[0].hero_hp,
                    maxMP: action.payload.data[0].hero_mp,
                    maxSP: action.payload.data[0].hero_sp
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    currentHero: 'none'
                }
            }

        default:
            return state
    }

}