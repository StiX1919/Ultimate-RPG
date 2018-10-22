import axios from "axios";


//Action Constants

const SELECT_HERO = "SELECT_HERO"

const STAT_MODIFIER = "STAT_MODIFIER"

const GET_SHOP = 'GET_SHOP'
const PURCHASE_ITEM = "PURCHASE_ITEM"

const EQUIP_GEAR = 'EQUIP_GEAR'

const BEAT_MONSTER = 'BEAT_MONSTER'
const LEVEL_UP = 'LEVEL_UP'

const GET_WEAPON_EXP = 'GET_WEAPON_EXP'

const GET_DUNGEONS = 'GET_DUNGEONS'

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
    bonusStats: 0,
    abilities: [],
    dungeons: []

}


//Action Creators
//grabs discovered dungeons on load
export function getDungeons(id){
    return {
        type: GET_DUNGEONS,
        payload: axios.get(`/api/getDungeons?heroID=${id}`)
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
export function levelUp(exp, level, nextLevel, hero){
    
    let newLevel = level += 1
    let newExp = exp - nextLevel
    let newNextLevel = newLevel * 100
    let newBonusStats = hero.extra_stats += 1

    let newHero = Object.assign({}, hero, {extra_stats: newBonusStats})

    return {
        type: LEVEL_UP,
        payload: {
            newLevel, newExp, newNextLevel, newHero, newBonusStats
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

export function statModifier(hero, direction, statType) {
    let modHero = hero
    if(direction === '+') {
        if(statType === 'str') {
            modHero.hero_str++
            modHero.extra_stats--
        }
        if(statType === 'def') {
            modHero.hero_def ++
            modHero.extra_stats--
        }
        if(statType === 'spd') {
            modHero.hero_spd++
            modHero.extra_stats--
        }
    }

    return {
        type: STAT_MODIFIER,
        payload: modHero
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
        case STAT_MODIFIER + '_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case STAT_MODIFIER + '_FULFILLED':
            return {
                ...state,
                isLoading: false,
                currentHero: action.payload
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
                exp: action.payload.newExp,
                nextLevel: action.payload.newNextLevel,
                level: action.payload.newLevel,
                bonusStats: action.payload.newBonusStats
            }

        default:
            return state
    }

}