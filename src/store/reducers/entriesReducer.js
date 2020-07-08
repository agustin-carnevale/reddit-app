import {
    FETCH_ENTRIES,
    DISMISS_POST
} from '../actions/types'

const initialState = {
    list:[],
    after: null
}

export default (state = initialState, {type, payload})=>{
    switch(type){
        case FETCH_ENTRIES:
            return payload
        case DISMISS_POST:
            return {
                after: state.after,
                list: state.list.filter(post=>post.data.id !== payload)
            }
        default:
            return state
    }
}