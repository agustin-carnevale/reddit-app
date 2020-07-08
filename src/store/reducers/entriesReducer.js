import {
    FETCH_ENTRIES,
    DISMISS_POST,
    DISMISS_ALL_POSTS,
    RESTORE_APP,
    READ_POST
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
                list: state.list.filter(post=>post.id !== payload)
            }
        case DISMISS_ALL_POSTS:
            return {
                after: null,
                list: []
            }
        case RESTORE_APP:
            return {
                after: payload.after,
                list: payload.list
            }
        case READ_POST:
            return {
                after: state.after,
                list: state.list.map(post=> post.id !== payload ? post: {...post, read: true})
            }
        default:
            return state
    }
}