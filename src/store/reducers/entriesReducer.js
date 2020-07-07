import {
    FETCH_ENTRIES
} from '../actions/types'

const initialState = []

export default (state = initialState, {type, payload})=>{
    switch(type){
        case FETCH_ENTRIES:
            console.log("FETCH_ENTRIES:", payload)
            return payload
        default:
            return state
    }
}