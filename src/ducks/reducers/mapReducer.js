import axios from "axios";


//Action Constants

const GET_MAP = "GET_MAP"
const UPDATE_AREA = 'UPDATE_AREA'

const DISCOVER = 'DISCOVER'
const NO_DISCOVER = 'NO_DISCOVER'

const MOVE = "MOVE"
const GO_BACK = 'GO_BACK'


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

export function goBack(){
    return {
        type: GO_BACK,
        payload: 'none'
    }
}

export function move(direction, state){
    return function(dispatch){

        let letter = ''
        let type = ''
        let mod = ''
        let area = ''
        let areaMap = state.areaMap
        
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
                console.log('right', state.heroX >= (state.mapX * 10))
                if(state.heroX >= (state.mapX * 10)){
                    area = ++state.mapX
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapX
                break;
                case 'left':
                console.log('left', state.heroX - 1 < ((state.mapX - 1) * 10) + 1)
                if(state.heroX - 1 < ((state.mapX - 1) * 10) + 1){
                    area = --state.mapX
                    dispatch(getMap(state.mapX, state.mapY))
                } else area = state.mapX
                break;
                
                default: area = state.mapX
            }
        }
        console.log(area)
        
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
            console.log('hit')
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
                    console.log(discovered[0].area_type, color)
        
        
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

    let exists = false;
    let spots = discovered.slice().filter(spot => {
        return (spot.x_location === x_location && spot.y_location === y_location)
    })
    console.log('areas', area_x, area_y)


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
            break;
        case GET_MAP + '_FULFILLED':
            return {
                ...state,
                isLoading: false,
                locations: action.payload.locations,
                areaMap: action.payload.areaMap,
                activeSpot: action.payload.locations.find(spot => (spot.x_location === state.heroX && spot.y_location === state.heroY))
            }
            break;

        case UPDATE_AREA:
            return {
                ...state,
                mapX: action.payload.X,
                mapY: action.payload.Y
            }
            break;

        case DISCOVER + '_PENDING':
            
            return {
                ...state,
                isLoading: true
            }
            break;
        case DISCOVER + '_FULFILLED':
            console.log(action)
            return {
                ...state,
                isLoading: false, 
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }
            break;
        case NO_DISCOVER:
            console.log(action)
            return{
                ...state,
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }
            break;

        case MOVE:
            let {mod, type, letter, area, areaMap} = action.payload
            let activeSpot = {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
            switch(action.payload.letter){
                case 'X':
                    activeSpot = state.locations.filter(spot => {return(spot.x_location === action.payload.mod && spot.y_location === state.heroY)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
                    break;
                case 'Y':
                    activeSpot = state.locations.filter(spot => {return(spot.x_location === state.heroX && spot.y_location === action.payload.mod)})[0] || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}
                    break;
                default: null
            }
            
            return {
                ...state,
                [`hero${letter}`]: mod,
                [`heroPrev${letter}`]: type,
                [`map${letter}`]: area,
                activeSpot
            }
            break;

        case GO_BACK:
            return {
                ...state,
                heroX: state.heroPrevX,
                heroY: state.heroPrevY
            }


        default:
            return state
    }

}