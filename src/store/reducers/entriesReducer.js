import {
    FETCH_ENTRIES,
    DISMISS_POST,
    DISMISS_ALL_POSTS
} from '../actions/types'

const initialState = {
    list:[],
    after: null
}

export default (state = initialState, {type, payload})=>{
    switch(type){
        case FETCH_ENTRIES:
            return {
                after: payload.after,
                list: state.list.concat(payload.list)
            }
        case DISMISS_POST:
            return {
                after: state.after,
                list: state.list.filter(post=>post.data.id !== payload)
            }
        case DISMISS_ALL_POSTS:
            return {
                after: null,
                list: []
            }
        default:
            return state
    }
}