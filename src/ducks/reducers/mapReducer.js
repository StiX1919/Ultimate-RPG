import axios from "axios";


//Action Constants

const GET_MAP = "GET_MAP"
const UPDATE_AREA = 'UPDATE_AREA'

const BUILD_MAP = "BUILD_MAP"
// const MOVE = 'MOVE'
const DISCOVER = 'DISCOVER'
const NO_DISCOVER = 'NO_DISCOVER'


//Initial State

const initialState = {
    areaMap: [],
    locations: [],

    mapX: 1,
    mapY: 1,

    heroX: 3,
    heroY: 3,
    
    isLoading: false
}


//Action Creators

//need to get locations from db before map is built when area is changed
export function getMap(X, Y) {
        return {
            type: GET_MAP,
            payload: axios.get(`/api/getMap/${X}/${Y}`)
                .then(response => {
                    let builtMap = buildMap(response.data, X, Y)

                    return {locations: response.data, builtMap}
                })
        }
    
    
  }
export function updateArea(X, Y) {
    return {
        type: UPDATE_AREA,
        payload: {X, Y}
    }
}

export function buildMap(locations, areaX, areaY){

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

    let areaMap = [];
    let currRow = [];
    
    for(let row = areaY * 10, col = -9 + (areaX * 10); row > -10 + (areaY * 10); col++){
    
        let discovered = locations.filter(spot => {
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
    return areaMap
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
                        let builtMap = buildMap(res.data, area_x, area_y)
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
                    builtMap: buildMap(discovered, area_x, area_y)
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
                areaMap: action.payload.builtMap
            }

        case UPDATE_AREA:
            return {
                ...state,
                mapX: action.payload.X,
                mapY: action.payload.Y
            }
    
        case BUILD_MAP:
            return {
                ...state,
                areaMap: action.payload
            }

        case DISCOVER + '_PENDING':
            
            return {
                ...state,
                isLoading: true
            }

        case DISCOVER + '_FULFILLED':
            console.log(action)
            return {
                ...state,
                isLoading: false, 
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }
        case NO_DISCOVER:
            console.log(action)
            return{
                ...state,
                areaMap: action.payload.builtMap,
                locations: action.payload.spots
            }
        default:
            return state
    }

}