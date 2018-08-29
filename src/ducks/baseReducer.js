import axios from "axios";


//Action Constants

// const GET_USER = "GET_USER"



//Initial State

const initialState = {
    testNum: 0,
    isLoading: false,
    user: null,
    heroes: []
    
}


//Action Creators

// export function getUser() {
//     return {
//         type: GET_USER,
//         payload: axios.get('/api/getUser')
//     }
// }






//Reducer

export default function baseReducer(state=initialState, action) {
    switch(action.type) {
        

        default:
            return state
    }

}