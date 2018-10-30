import axios from "axios";


//Action Constants

const GET_MAP = "GET_MAP"
const UPDATE_AREA = 'UPDATE_AREA'

const DISCOVER = 'DISCOVER'
const NO_DISCOVER = 'NO_DISCOVER'

const MOVE = "MOVE"
const GO_BACK = 'GO_BACK'

const ENTER_AREA = 'ENTER_AREA'


//Initial State

const initialState = {
    areaMap: [],
    locations: [],

    mapX: 1,
    mapY: 1,

    heroX: 3,
    heroY: 3,
    heroPrevX: 3,
    heroPrevY: 3,
    
    activeSpot: {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'},
    isLoading: false
}


//Action Creators
export function enterArea(X, Y, spotType){
    let numArr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    let locations = []
    
    function colorGen(place) {
        switch(place){
            case 'Town': 
                return '#808080';
            case 'Plains': 
                return '#90ee90';
            case 'Forest': 
                return '#006400';
            case 'Ocean':
                return '#00008b'
            case 'River':
                return '#add8e6'
            case 'Mountains':
                return '#803605'
            case 'Desert':
                return '#f2a23a'
            default: return 'white'
        }
    }


    let areaMap = numArr.map( col => {
        let newRow = numArr.map( row => {
            locations.push({
                x_location: row,
                y_location: col,
                area_type: spotType,
                area_name: 'none',
                discovered_by: 'none',
                color: colorGen(spotType)
            })
            return {
                x: row,
                y: col,
                type: spotType,
                name: 'none',
                discovered_by: 'none',
                color: colorGen(spotType)
            }
        }).reverse()
        return newRow
    })

    return {
        type: ENTER_AREA,
        payload: {areaMap, locations}
    }

}

export function goBack(){
    return {
        type: GO_BACK,
        payload: 'none'
    }
}

export function move(direction, state){
    return function(dispatch){

        let letter = ''
        let type = 0
        let mod = 0
        let area = 0
        
        if(direction === 'up' || direction === 'down'){
            type = state.heroY
            letter = 'Y'
            
            switch(direction){
                case 'up':
                if(state.heroY >= state.mapY * 10){
                    area = ++state.mapY
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapY
                break;
                case 'down':
                if(state.heroY - 1 < ((state.mapY - 1) * 10) + 1){
                    area = --state.mapY
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapY
                break;
                default: area = state.mapY
            }
        } else if(direction === 'left' || direction === 'right'){
            type = state.heroX
            letter = 'X'
            switch(direction){
                case 'right':
                if(state.heroX >= (state.mapX * 10)){
                    area = ++state.mapX
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapX
                break;
                case 'left':
                if(state.heroX - 1 < ((state.mapX - 1) * 10) + 1){
                    area = --state.mapX
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapX
                break;
                
                default: area = state.mapX
            }
        }

        if(direction === 'up' || direction === 'right'){
            mod = type + 1
        } else if(direction === 'left' || direction === 'down'){
            mod = type - 1
        }
        
        dispatch({
            type: MOVE,
            payload: {
                letter,
                mod,
                type,
                area,
            }
        })
    }
}

//need to get locations from db before map is built when area is changed
// export function getMap(X, Y) {
//     return {
//         type: GET_MAP,
//         payload: axios.get(`/api/getMap/${X}/${Y}`)
//         .then(response => {
//             let builtMap = buildMap(response.data, X, Y)
//             console.log(builtMap)
//             return {locations: response.data, builtMap}
//         })
//     }    
// }
export function updateArea(X, Y) {
    return {
        type: UPDATE_AREA,
        payload: {X, Y}
    }
}

// rework discovory functionality to trigger area clear before moving
export function getMap(areaX, areaY){
    function colorGen(place) {
        switch(place){
            case 'Town': 
                return '#808080';
            case 'Plains': 
                return '#90ee90';
            case 'Forest': 
                return '#006400';
            case 'Ocean':
                return '#00008b'
            case 'River':
                return '#add8e6'
            case 'Mountains':
                return '#803605'
            case 'Desert':
                return '#f2a23a'
            default: return 'white'
        }
    }
    
    return {
        type: GET_MAP,
        payload: axios.get(`/api/getMap/${areaX}/${areaY}`).then(response => {
            let areaMap = [];
            let currRow = [];
            for(let row = areaY * 10, col = -9 + (areaX * 10); row > -10 + (areaY * 10); col++){
            
                let discovered = response.data.filter(spot => {
                    return spot.x_location === col && spot.y_location === row
                })
                if(!discovered[0]){
                    discovered = null
                }
        
              if(col === 10 * areaX){
                if(discovered !== null){
                    let color = colorGen(discovered[0].area_type)
        
                    currRow.push({
                        x: discovered[0].x_location,
                        y: discovered[0].y_location,
                        type: discovered[0].area_type,
                        name: discovered[0].area_name,
                        discovered_by: discovered[0].discovered_by,
                        color
                    })
                    areaMap.push(currRow)
                    
                    currRow = []
                    
                    col = -10 + (areaX * 10);
                    row--
                } else {
                    currRow.push({x: col, y: row});
                    areaMap.push(currRow)
            
                    currRow = []
            
                    col = -10 + (areaX * 10);
                    row--
                }
              } else {
                  if(discovered !== null){
                    let color = colorGen(discovered[0].area_type)
        
                    currRow.push({
                        x: discovered[0].x_location,
                        y: discovered[0].y_location,
                        type: discovered[0].area_type,
                        name: discovered[0].area_name,
                        discovered_by: discovered[0].discovered_by,
                        color
                    })
                  } else {
                      currRow.push({
                          x: col, 
                          y: row,
                          type: undefined,
                          name: undefined,
                          discovered_by: undefined
                        })
        
                  }
              }
            }
            return {
                areaMap,
                locations: response.data
            }
    
        })
    }
  }



  export function discover(discObj, discovered, spotType) {
    const {area_x, area_y, discovered_by, x_location, y_location} = discObj

    let spots = discovered.slice().filter(spot => {
        return (spot.x_location === x_location && spot.y_location === y_location)
    })


    if(!spots[0]){
        return {
            type: DISCOVER,
            payload: axios.post('/api/newPlace', {
                            area_name: 'none',
                            area_type: spotType,
                            area_x,
                            area_y,
                            discovered_by,
                            x_location,
                            y_location
                    }).then(res => {
                        let builtMap = getMap(area_x, area_y)
                        return {
                            spots: res.data,
                            builtMap
                        }
                    }).catch(err => console.log(err))
        }
                
                    
        } else {
            return {
                type: NO_DISCOVER,
                payload: {
                    spots: discovered,
                    builtMap: getMap(area_x, area_y)
                }
            }

        }
        
  }


//Reducer

export default function mapReducer(state=initialState, action) {
    switch(action.type) {
        case GET_MAP + '_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case GET_MAP + '_FULFILLED':
            return {
                ...state,
                isLoading: false,
                locations: action.payload.locations,
                areaMap: action.payload.areaMap,
                activeSpot: action.payload.locations.find(spot => (spot.x_location === state.heroX && spot.y_location === state.heroY))
            }

        case UPDATE_AREA:
            return {
                ...state,
                mapX: action.payload.X,
                mapY: action.payload.Y
            }

        case DISCOVER + '_PENDING':
            
            return {
                ...state,
                isLoading: true
            }
        case DISCOVER + '_FULFILLED':
            return {
                ...state,
                isLoading: false, 
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }
        case NO_DISCOVER:
            return{
                ...state,
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }

        case MOVE:
            let {mod, type, letter, area} = action.payload
            let otherLet = ''
            let otherData = 0
            let activeSpot = {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
            switch(action.payload.letter){
                case 'X':
                    otherLet = 'Y'
                    otherData = state.heroY
                    activeSpot = state.locations.filter(spot => {return(spot.x_location === action.payload.mod && spot.y_location === state.heroY)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
                    break;
                case 'Y':
                    otherLet = 'X'
                    otherData = state.heroX
                    activeSpot = state.locations.filter(spot => {return(spot.x_location === state.heroX && spot.y_location === action.payload.mod)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
                    break;
                default: return null
            }
            
            return {
                ...state,
                [`hero${letter}`]: mod,
                [`heroPrev${letter}`]: type,
                [`map${letter}`]: area,
                [`heroPrev${otherLet}`]: otherData,
                activeSpot
            }

        case GO_BACK:
            
            return {
                ...state,
                heroX: state.heroPrevX,
                heroY: state.heroPrevY,
                activeSpot: state.locations.filter(spot => {return(spot.x_location === state.heroPrevX && spot.y_location === state.heroPrevY)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
            }

        case ENTER_AREA:
            return {
                ...state,
                areaMap: action.payload.areaMap,
                locations: action.payload.locations,
                activeSpot: action.payload.locations.filter(spot => {return(spot.x_location === state.heroX && spot.y_location === state.heroY)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
            }

        default:
            return state
    }

}